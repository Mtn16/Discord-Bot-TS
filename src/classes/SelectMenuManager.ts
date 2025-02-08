import { AnySelectMenuInteraction } from "discord.js";
import StringSelectMenuManager from "./StringSelectMenuManager";
import SelectMenus from "../types/SelectMenu";
import UserSelectMenuManager from "./UserSelectMenuManager";
import RoleSelectMenuManager from "./RoleSelectMenuManager";
import ChannelSelectMenuManager from "./ChannelSelectMenuManager";
import MentionableSelectMenuManager from "./MentionableSelectMenuManager";

export default class SelectMenuManager {
     stringSelectMenuManager: StringSelectMenuManager
     userSelectMenuManager: UserSelectMenuManager
     roleSelectMenuManager: RoleSelectMenuManager
     channelSelectMenuManager: ChannelSelectMenuManager
     mentionableSelectMenuManager: MentionableSelectMenuManager

     constructor(selectMenus: SelectMenus) {
          this.stringSelectMenuManager = selectMenus.stringSelectMenu
          this.userSelectMenuManager = selectMenus.userSelectMenu
          this.roleSelectMenuManager = selectMenus.roleSelectMenu
          this.channelSelectMenuManager = selectMenus.channelSelectMenu
          this.mentionableSelectMenuManager = selectMenus.mentionableSelectMenu
     }

     async handleSelectMenu(interaction: AnySelectMenuInteraction) {
          if(interaction.isStringSelectMenu()) {
               this.stringSelectMenuManager.handleSelectMenu(interaction)
          } else if (interaction.isUserSelectMenu()) {
               this.userSelectMenuManager.handleSelectMenu(interaction)
          } else if (interaction.isRoleSelectMenu()) {
               this.roleSelectMenuManager.handleSelectMenu(interaction)
          } else if (interaction.isChannelSelectMenu()) {
               this.channelSelectMenuManager.handleSelectMenu(interaction)
          } else if (interaction.isMentionableSelectMenu()) {
               this.mentionableSelectMenuManager.handleSelectMenu(interaction)
          }
     }
}