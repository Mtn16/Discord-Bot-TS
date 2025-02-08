import { StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { StringSelectMenu } from "../../types/SelectMenu";

export default class ExampleStringSelectMenu implements StringSelectMenu {
     customId = "example_select_string"
     data = new StringSelectMenuBuilder()
     async execute (interaction: StringSelectMenuInteraction) {}
}
