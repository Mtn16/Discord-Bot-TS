import { ContextMenuCommandBuilder, ContextMenuCommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

export default interface ContextMenuCommand {
     data: ContextMenuCommandBuilder
     execute: (interaction: ContextMenuCommandInteraction) => Promise<void>;
}

export interface MessageContextMenuCommand {
     execute: (interaction: MessageContextMenuCommandInteraction) => Promise<void>;
}

export interface UserContextMenuCommand {
     execute: (interaction: UserContextMenuCommandInteraction) => Promise<void>;
}