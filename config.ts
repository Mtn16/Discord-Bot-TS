import { GatewayIntentBits } from "discord.js"
import "dotenv/config"
import Config from "./types/Config"

export const config: Config = {
     token: process.env.BOT_TOKEN || "",
     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
     clientId: process.env.CLIENT_ID || "",
     autoStart: true
}