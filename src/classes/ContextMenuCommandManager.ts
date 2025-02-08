import { REST, Routes, MessageFlags, RESTPostAPIContextMenuApplicationCommandsJSONBody, ContextMenuCommandInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import Config from "../types/Config";
import ContextMenuCommand, { MessageContextMenuCommand, UserContextMenuCommand } from "../types/ContextMenuCommand";

export default class ContextMenuCommandManager {

     restCommands: RESTPostAPIContextMenuApplicationCommandsJSONBody[] = []
     messageCommands: Map<string, MessageContextMenuCommand> = new Map()
     userCommands: Map<string, UserContextMenuCommand> = new Map()

     private messageCommandFiles = fs.readdirSync(path.join(__dirname, "../commands/contextMenuCommands/message")).filter(file => file.endsWith(".js"))
     private userCommandFiles = fs.readdirSync(path.join(__dirname, "../commands/contextMenuCommands/user")).filter(file => file.endsWith(".js"))

     async loadCommands(config: Config): Promise<[Map<string, MessageContextMenuCommand>, Map<string, UserContextMenuCommand>]> {
          for (const file of this.messageCommandFiles) {
               const command: ContextMenuCommand = new (await import(`../commands/contextMenuCommands/message/${file}`)).default()
     
               if(command && command.data) {
                    this.restCommands.push(command.data.toJSON())
                    this.messageCommands.set(command.data.name, command)
                    console.log(`✅ Loaded command: ${command.data.name}`)
               } else {
                    console.warn(`⚠️ Message context command file ${file} doesn't have a valid command structure!`)
               }
          }

          for (const file of this.userCommandFiles) {
               const command: ContextMenuCommand = (await import(`../commands/contextMenuCommands/user/${file}`)).default
     
               if(command && command.data) {
                    this.restCommands.push(command.data.toJSON())
                    this.userCommands.set(command.data.name, command)
                    console.log(`✅ Loaded command: ${command.data.name}`)
               } else {
                    console.warn(`⚠️ User context command file ${file} doesn't have a valid command structure!`)
               }
          }
     
          const rest = new REST({ version: "10" }).setToken(config.token)
     
          try {
               console.log("🚀 Registering context commands...")
               await rest.put(Routes.applicationCommands(config.clientId), { body: this.restCommands })
               console.log("✅ Context commands registered!")
          } catch (error) {
               console.error("❌ An error occured while attempting to register commands: ", error)
          }
          
          return [this.messageCommands, this.userCommands]
     }

     async handleCommand(interaction: ContextMenuCommandInteraction) {
          if(interaction.isMessageContextMenuCommand()) {
               const command = this.messageCommands.get(interaction.commandName)
               if(!command) return
               try {
                    command.execute(interaction)
               } catch (error) {
                    console.error(error)
                    await interaction.reply({ content: "❌ An error occurred while executing this command.", flags: [MessageFlags.Ephemeral] })
               }
          } else if (interaction.isUserContextMenuCommand()) {
               const command = this.userCommands.get(interaction.commandName)
               if(!command) return
               try {
                    command.execute(interaction)
               } catch (error) {
                    console.error(error)
                    await interaction.reply({ content: "❌ An error occurred while executing this command.", flags: [MessageFlags.Ephemeral] })
               }
          } 
     }
}