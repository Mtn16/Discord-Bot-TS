import { ButtonInteraction, MessageFlags } from "discord.js";
import fs from "fs"
import path from "path";
import Button from "../types/Button";

export default class ButtonManager {

     buttons: Map<string, Button> = new Map()

     private buttonFiles = fs.readdirSync(path.join(__dirname, "../buttons")).filter(file => file.endsWith(".js"))

     async loadButtons(): Promise<Map<string, Button>> {
          for (const file of this.buttonFiles) {
               const button: Button = new (await import(`../buttons/${file}`)).default()
               if(!button) continue

               this.buttons.set(button.customId, button)
               console.log(`✅ Button "${button.customId}" loaded`);
          }
          
          return this.buttons
     }

     async handleButton(interaction: ButtonInteraction) {
          const button = this.buttons.get(interaction.customId)
          if(!button) return
          try {
               await button.execute(interaction);
          } catch (error) {
               console.error(error)
               await interaction.reply({ content: "❌ An error occurred while processing this button.", flags: [MessageFlags.Ephemeral] })
          }
     }
}
