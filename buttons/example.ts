import { ButtonBuilder, ButtonInteraction } from "discord.js";
import Button from "../types/Button";

export default class ExampleButton implements Button {
     customId = "example_button"
     data = new ButtonBuilder()
     async execute (interaction: ButtonInteraction) {}
}
