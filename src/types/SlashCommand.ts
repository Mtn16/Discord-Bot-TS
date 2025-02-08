import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface SlashCommand {
     data: SlashCommandBuilder
     execute: (interaction: ChatInputCommandInteraction ) => Promise<void>
     autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>
}