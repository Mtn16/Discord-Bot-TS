import { ButtonBuilder, ButtonInteraction } from "discord.js";

export default interface Button {
     customId: string,
     data: ButtonBuilder,
     execute: (interaction: ButtonInteraction) => void | Promise<void>
}