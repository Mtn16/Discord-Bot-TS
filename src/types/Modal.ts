import { ModalBuilder, ModalSubmitInteraction } from "discord.js";

export default interface Modal {
     data: ModalBuilder
     execute: (interaction: ModalSubmitInteraction) => void | Promise<void>
}