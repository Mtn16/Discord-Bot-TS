import { Client } from "discord.js";
import fs from "fs"
import path from "path";
import Event from "../types/Event";

export default class EventManager {
     constructor(private client: Client) {}

     async loadEvents() {
          const eventFiles = fs.readdirSync(path.join(__dirname, "../events")).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

          for (const file of eventFiles) {
               const eventModule = await import(`../events/${file}`)
               const event: Event = new eventModule.default()
               
               if(!event) continue

               if(event.once) {
                    this.client.once(event.name, (...args) => event.execute(...args))
               } else {
                    this.client.on(event.name, (...args) => event.execute(...args))
               }

               console.log(`✅ Event "${event.constructor.name}" loaded`);
          }
     }
}