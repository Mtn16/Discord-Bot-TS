import { ChannelSelectMenuBuilder, ChannelSelectMenuInteraction } from "discord.js";
import { ChannelSelectMenu } from "../../types/SelectMenu";

export default class ExampleChannelSelectMenu implements ChannelSelectMenu {
     customId = "example_select_channel"
     data = new ChannelSelectMenuBuilder()
     async execute (interaction: ChannelSelectMenuInteraction) {}
}
