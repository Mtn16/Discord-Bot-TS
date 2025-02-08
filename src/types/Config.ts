import { GatewayIntentBits } from "discord.js"

export default interface Config {
     token: string
     intents: GatewayIntentBits[]
     clientId: string
     autoStart?: boolean
}