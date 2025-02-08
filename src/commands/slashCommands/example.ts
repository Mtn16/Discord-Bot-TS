import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import SlashCommand from "../../types/SlashCommand";

export default class ExampleSlashCommand implements SlashCommand {
     data = new SlashCommandBuilder().setName("example").setDescription("Example slash command")
     async execute (interaction: ChatInputCommandInteraction) {}
     async autocomplete (interaction: AutocompleteInteraction) {} //Optional
}
