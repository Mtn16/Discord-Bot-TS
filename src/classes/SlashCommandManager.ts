import { RESTPostAPIChatInputApplicationCommandsJSONBody, REST, Routes, ChatInputCommandInteraction, MessageFlags, AutocompleteInteraction } from "discord.js";
import fs from "fs"
import path from "path";
import Config from "../types/Config";
import SlashCommand from "../types/SlashCommand";

export default class SlashCommandManager {

     restCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
     commands: Map<string, SlashCommand> = new Map()

     private commandFiles = fs.readdirSync(path.join(__dirname, "../commands/slashCommands")).filter(file => file.endsWith(".js"))

     async loadCommands(config: Config): Promise<Map<string, SlashCommand>> {
          for (const file of this.commandFiles) {
               const command: SlashCommand = new (await import(`../commands/slashCommands/${file}`)).default()
     
               if(command && command.data) {
                    this.restCommands.push(command.data.toJSON())
                    this.commands.set(command.data.name, command)
                    console.log(`✅ Loaded command: ${command.data.name}`)
               } else {
                    console.warn(`⚠️ Slash command file ${file} doesn't have a valid command structure!`)
               }
          }
     
          const rest = new REST({ version: "10" }).setToken(config.token)
     
          try {
               console.log("🚀 Registering slash commands...")
               await rest.put(Routes.applicationCommands(config.clientId), { body: this.restCommands })
               console.log("✅ Slash commands registered!")
          } catch (error) {
               console.error("❌ An error occured while attempting to register commands: ", error)
          }
          
          return this.commands
     }

     async handleCommand(interaction: ChatInputCommandInteraction) {
          const command = this.commands.get(interaction.commandName)
          if(!command) return
          try {
               await command.execute(interaction);
          } catch (error) {
               console.error(error)
               await interaction.reply({ content: "❌ An error occurred while executing this command.", flags: [MessageFlags.Ephemeral] })
          }
     }

     async handleAutocomplete(interaction: AutocompleteInteraction) {
          const command = this.commands.get(interaction.commandName)
          if(!command) return
          if(!command.autocomplete) return
          try {
               await command.autocomplete(interaction);
          } catch (error) {
               console.error(error)
          }
     }
}