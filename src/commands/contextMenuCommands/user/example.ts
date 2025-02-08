import { ApplicationCommandType, ContextMenuCommandBuilder, UserContextMenuCommandInteraction } from "discord.js";
import { UserContextMenuCommand } from "../../../types/ContextMenuCommand";

export default class ExampleUserContextCommand implements UserContextMenuCommand {
     data = new ContextMenuCommandBuilder().setName("Example").setType(ApplicationCommandType.User)
     async execute (interaction: UserContextMenuCommandInteraction) {}
}
