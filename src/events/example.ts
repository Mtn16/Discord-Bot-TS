import { Client, ClientEvents, Events } from "discord.js";
import Event from "../types/Event";

export default class ExampleEvent implements Event {
     name: keyof ClientEvents = Events.ClientReady
     once = true

     async execute (client: Client) {}
}
