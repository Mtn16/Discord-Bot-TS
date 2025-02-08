import { ChannelSelectMenuBuilder, ChannelSelectMenuInteraction, MentionableSelectMenuBuilder, MentionableSelectMenuInteraction, RoleSelectMenuBuilder, RoleSelectMenuInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction, UserSelectMenuBuilder, UserSelectMenuInteraction } from "discord.js"
import StringSelectMenuManager from "../classes/StringSelectMenuManager"
import UserSelectMenuManager from "../classes/UserSelectMenuManager"
import RoleSelectMenuManager from "../classes/RoleSelectMenuManager"
import ChannelSelectMenuManager from "../classes/ChannelSelectMenuManager"
import MentionableSelectMenuManager from "../classes/MentionableSelectMenuManager"

export default interface SelectMenus {
     stringSelectMenu: StringSelectMenuManager
     userSelectMenu: UserSelectMenuManager,
     roleSelectMenu: RoleSelectMenuManager,
     channelSelectMenu: ChannelSelectMenuManager,
     mentionableSelectMenu: MentionableSelectMenuManager
}

export interface StringSelectMenu {
     data: StringSelectMenuBuilder,
     execute: (interaction: StringSelectMenuInteraction) => void | Promise<void>
}

export interface UserSelectMenu {
     data: UserSelectMenuBuilder,
     execute: (interaction: UserSelectMenuInteraction) => void | Promise<void>
}

export interface RoleSelectMenu {
     data: RoleSelectMenuBuilder,
     execute: (interaction: RoleSelectMenuInteraction) => void | Promise<void>
}

export interface ChannelSelectMenu {
     data: ChannelSelectMenuBuilder,
     execute: (interaction: ChannelSelectMenuInteraction) => void | Promise<void>
}

export interface MentionableSelectMenu {
     data: MentionableSelectMenuBuilder,
     execute: (interaction: MentionableSelectMenuInteraction) => void | Promise<void>
}