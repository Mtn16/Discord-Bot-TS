import { MessageFlags, UserSelectMenuInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import { UserSelectMenu } from "../types/SelectMenu";

export default class UserSelectMenuManager {

     selectMenus: Map<string, UserSelectMenu> = new Map()

     private buttonFiles = fs.readdirSync(path.join(__dirname, "../selectMenus/user")).filter(file => file.endsWith(".js"))

     async loadSelectMenus(): Promise<Map<string, UserSelectMenu>> {
          for (const file of this.buttonFiles) {
               const menu: UserSelectMenu = new (await import(`../selectMenus/user/${file}`)).default()
               if(!menu || !menu.data.data.custom_id) continue

               this.selectMenus.set(menu.data.data.custom_id, menu)
               console.log(`✅ User select menu "${menu.data.data}" loaded`);
          }
          
          return this.selectMenus
     }

     async handleSelectMenu(interaction: UserSelectMenuInteraction) {
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