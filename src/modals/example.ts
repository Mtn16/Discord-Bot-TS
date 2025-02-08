import { ModalBuilder, ModalSubmitInteraction } from "discord.js";
import Modal from "../types/Modal";

export default class ExampleModal implements Modal {
     data = new ModalBuilder().setCustomId("example_modal").setTitle("Example")
     async execute (interaction: ModalSubmitInteraction) {}
}
