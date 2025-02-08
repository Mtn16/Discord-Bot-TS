import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import Modal from "../types/Modal";

export default class ModalManager {

     modals: Map<string, Modal> = new Map()

     private modalFiles = fs.readdirSync(path.join(__dirname, "../modals")).filter(file => file.endsWith(".js"))

     async loadModals(): Promise<Map<string, Modal>> {
          for (const file of this.modalFiles) {
               const modal: Modal = new (await import(`../modals/${file}`)).default()
               if(!modal || !modal.data.data.custom_id) continue

               this.modals.set(modal.data.data.custom_id, modal)
               console.log(`✅ Modal "${modal.data.data.custom_id}" loaded`);
          }
          
          return this.modals
     }

     async handleModal(interaction: ModalSubmitInteraction) {
          const modal = this.modals.get(interaction.customId)
          if(!modal) return
          try {
               await modal.execute(interaction);
          } catch (error) {
               console.error(error)
               await interaction.reply({ content: "❌ An error occurred while processing this modal.", flags: [MessageFlags.Ephemeral] })
          }
     }
}