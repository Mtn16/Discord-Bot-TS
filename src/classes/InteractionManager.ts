import { Interaction } from "discord.js";
import SlashCommandManager from "./SlashCommandManager";
import ButtonManager from "./ButtonManager";
import ContextMenuCommandManager from "./ContextMenuCommandManager";
import SelectMenuManager from "./SelectMenuManager";
import StringSelectMenuManager from "./StringSelectMenuManager";
import UserSelectMenuManager from "./UserSelectMenuManager";
import RoleSelectMenuManager from "./RoleSelectMenuManager";
import ChannelSelectMenuManager from "./ChannelSelectMenuManager";
import MentionableSelectMenuManager from "./MentionableSelectMenuManager";
import ModalManager from "./ModalManager";

export default class InteractionManager {
     slashCommandManager: SlashCommandManager
     contextMenuCommandManager: ContextMenuCommandManager
     buttonManager: ButtonManager
     modalManager: ModalManager
     selectMenuManager: SelectMenuManager

     constructor() {
          this.slashCommandManager = new SlashCommandManager()
          this.contextMenuCommandManager = new ContextMenuCommandManager()
          this.buttonManager = new ButtonManager()
          this.modalManager = new ModalManager()
          this.selectMenuManager = new SelectMenuManager({
               stringSelectMenu: new StringSelectMenuManager(),
               userSelectMenu: new UserSelectMenuManager(),
               roleSelectMenu: new RoleSelectMenuManager(),
               channelSelectMenu: new ChannelSelectMenuManager(),
               mentionableSelectMenu: new MentionableSelectMenuManager()
          })
     }

     async handle(interaction: Interaction) {
          if(interaction.isChatInputCommand()) {
               await this.slashCommandManager.handleCommand(interaction);
          } else if(interaction.isAutocomplete()) {
               await this.slashCommandManager.handleAutocomplete(interaction);
          } else if(interaction.isButton()) {
               await this.buttonManager.handleButton(interaction)
          } else if(interaction.isAnySelectMenu()) {
               await this.selectMenuManager.handleSelectMenu(interaction)
          }
     }
}
