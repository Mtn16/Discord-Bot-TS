import { MessageFlags, MentionableSelectMenuInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import { MentionableSelectMenu } from "../types/SelectMenu";

export default class MentionableSelectMenuManager {

     selectMenus: Map<string, MentionableSelectMenu> = new Map()

     private buttonFiles = fs.readdirSync(path.join(__dirname, "../selectMenus/mentionable")).filter(file => file.endsWith(".js"))

     async loadSelectMenus(): Promise<Map<string, MentionableSelectMenu>> {
          for (const file of this.buttonFiles) {
               const menu: MentionableSelectMenu = new (await import(`../selectMenus/mentionable/${file}`)).default()
               if(!menu || !menu.data.data.custom_id) continue

               this.selectMenus.set(menu.data.data.custom_id, menu)
               console.log(`✅ Mentionable select menu "${menu.data.data}" loaded`);
          }
          
          return this.selectMenus
     }

     async handleSelectMenu(interaction: MentionableSelectMenuInteraction) {
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