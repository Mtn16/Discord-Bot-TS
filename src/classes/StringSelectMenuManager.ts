import { MessageFlags, StringSelectMenuInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import { StringSelectMenu } from "../types/SelectMenu";

export default class StringSelectMenuManager {

     selectMenus: Map<string, StringSelectMenu> = new Map()

     private buttonFiles = fs.readdirSync(path.join(__dirname, "../selectMenus/string")).filter(file => file.endsWith(".js"))

     async loadSelectMenus(): Promise<Map<string, StringSelectMenu>> {
          for (const file of this.buttonFiles) {
               const menu: StringSelectMenu = new (await import(`../selectMenus/string/${file}`)).default()
               if(!menu || !menu.data.data.custom_id) continue

               this.selectMenus.set(menu.data.data.custom_id, menu)
               console.log(`✅ String select menu "${menu.data.data}" loaded`);
          }
          
          return this.selectMenus
     }

     async handleSelectMenu(interaction: StringSelectMenuInteraction) {
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