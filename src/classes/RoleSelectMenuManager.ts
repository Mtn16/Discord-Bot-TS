import { MessageFlags, RoleSelectMenuInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import { RoleSelectMenu } from "../types/SelectMenu";

export default class RoleSelectMenuManager {

     selectMenus: Map<string, RoleSelectMenu> = new Map()

     private buttonFiles = fs.readdirSync(path.join(__dirname, "../selectMenus/role")).filter(file => file.endsWith(".js"))

     async loadSelectMenus(): Promise<Map<string, RoleSelectMenu>> {
          for (const file of this.buttonFiles) {
               const menu: RoleSelectMenu = new (await import(`../selectMenus/role/${file}`)).default()
               if(!menu || !menu.data.data.custom_id) continue

               this.selectMenus.set(menu.data.data.custom_id, menu)
               console.log(`✅ Role select menu "${menu.data.data}" loaded`);
          }
          
          return this.selectMenus
     }

     async handleSelectMenu(interaction: RoleSelectMenuInteraction) {
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