import { MentionableSelectMenuBuilder, MentionableSelectMenuInteraction } from "discord.js";
import { MentionableSelectMenu } from "../../types/SelectMenu";

export default class ExampleMentionableSelectMenu implements MentionableSelectMenu {
     customId = "example_select_mentionable"
     data = new MentionableSelectMenuBuilder()
     async execute (interaction: MentionableSelectMenuInteraction) {}
}
