import { MessageFlags, ChannelSelectMenuInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import { ChannelSelectMenu } from "../types/SelectMenu";

export default class ChannelSelectMenuManager {

     selectMenus: Map<string, ChannelSelectMenu> = new Map()

     private buttonFiles = fs.readdirSync(path.join(__dirname, "../selectMenus/channel")).filter(file => file.endsWith(".js"))

     async loadSelectMenus(): Promise<Map<string, ChannelSelectMenu>> {
          for (const file of this.buttonFiles) {
               const menu: ChannelSelectMenu = new (await import(`../selectMenus/channel/${file}`)).default()
               if(!menu || !menu.data.data.custom_id) continue

               this.selectMenus.set(menu.data.data.custom_id, menu)
               console.log(`✅ Channel select menu "${menu.data.data}" loaded`);
          }
          
          return this.selectMenus
     }

     async handleSelectMenu(interaction: ChannelSelectMenuInteraction) {
          const menu = this.selectMenus.get(interaction.customId)
          if(!menu) return
          try {
               await menu.execute(interaction);
          } catch (error) {
               console.error(error)
               await interaction.reply({ content: "❌ An error occurred while processing this select menu.", flags: [MessageFlags.Ephemeral] })
          }
     }
}