import { Client } from "discord.js";
import Config from "../types/Config";
import InteractionManager from "./InteractionManager";
import EventManager from "./EventManager";
import SlashCommand from "../types/SlashCommand";
import { MessageContextMenuCommand, UserContextMenuCommand } from "../types/ContextMenuCommand";
import Button from "../types/Button";
import { ChannelSelectMenu, MentionableSelectMenu, RoleSelectMenu, StringSelectMenu, UserSelectMenu } from "../types/SelectMenu";
import Modal from "../types/Modal";

export default class ExtendedClient extends Client {
     slashCommands: Map<string, SlashCommand>
     contextMenuCommands: [Map<string, MessageContextMenuCommand>, Map<string, UserContextMenuCommand>]
     messageContextMenuCommands: Map<string, MessageContextMenuCommand>
     userContextMenuCommands: Map<string, UserContextMenuCommand>
     buttons: Map<string, Button>
     modals: Map<string, Modal>

     stringSelectMenus: Map<string, StringSelectMenu>
     userSelectMenus: Map<string, UserSelectMenu>
     roleSelectMenus: Map<string, RoleSelectMenu>
     channelSelectMenus: Map<string, ChannelSelectMenu>
     mentionableSelectMenus: Map<string, MentionableSelectMenu>

     private config: Config
     private interactionManager: InteractionManager
     private eventManager: EventManager

     constructor(config: Config) {
          super({ intents: config.intents})
          extendedClient = this;
          this.config = config

          this.slashCommands = new Map()
          this.contextMenuCommands = [new Map(), new Map()]
          this.messageContextMenuCommands = new Map()
          this.userContextMenuCommands = new Map()

          this.buttons = new Map()
          this.modals = new Map()

          this.stringSelectMenus = new Map()
          this.userSelectMenus = new Map()
          this.roleSelectMenus = new Map()
          this.channelSelectMenus = new Map()
          this.mentionableSelectMenus = new Map()

          this.interactionManager = new InteractionManager()
          this.eventManager = new EventManager(this)
          
          if(config.autoStart) {
               this.start()
          }
     }
     
     async start() {
          await this.eventManager.loadEvents()
          this.slashCommands = await this.interactionManager.slashCommandManager.loadCommands(this.config)
          const contextMenuCommands = await this.interactionManager.contextMenuCommandManager.loadCommands(this.config)
          this.messageContextMenuCommands = contextMenuCommands[0]
          this.userContextMenuCommands = contextMenuCommands[1]

          this.buttons = await this.interactionManager.buttonManager.loadButtons()
          this.modals = await this.interactionManager.modalManager.loadModals()

          this.stringSelectMenus = await this.interactionManager.selectMenuManager.stringSelectMenuManager.loadSelectMenus()
          this.userSelectMenus = await this.interactionManager.selectMenuManager.userSelectMenuManager.loadSelectMenus()
          this.roleSelectMenus = await this.interactionManager.selectMenuManager.roleSelectMenuManager.loadSelectMenus()
          this.channelSelectMenus = await this.interactionManager.selectMenuManager.channelSelectMenuManager.loadSelectMenus()
          this.mentionableSelectMenus = await this.interactionManager.selectMenuManager.mentionableSelectMenuManager.loadSelectMenus()

          this.once("ready", () => {
               console.log(`✅ Logged in as ${this.user?.tag}`)
          })

          this.on("interactionCreate", async (interaction) => {
               await this.interactionManager.handle(interaction);
          })

          this.login(this.config.token)
     }
}

let extendedClient: ExtendedClient

export function getExtendedClient(): ExtendedClient {
     return extendedClient
}
