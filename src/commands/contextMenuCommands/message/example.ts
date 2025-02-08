import { ApplicationCommandType, ContextMenuCommandBuilder, MessageContextMenuCommandInteraction } from "discord.js";
import { MessageContextMenuCommand } from "../../../types/ContextMenuCommand";

export default class ExampleMessageContextCommand implements MessageContextMenuCommand {
     data = new ContextMenuCommandBuilder().setName("Example").setType(ApplicationCommandType.Message)
     async execute (interaction: MessageContextMenuCommandInteraction) {}
}
