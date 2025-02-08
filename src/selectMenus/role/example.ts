import { RoleSelectMenuBuilder, RoleSelectMenuInteraction } from "discord.js";
import { RoleSelectMenu } from "../../types/SelectMenu";

export default class ExampleRoleSelectMenu implements RoleSelectMenu {
     customId = "example_select_role"
     data = new RoleSelectMenuBuilder()
     async execute (interaction: RoleSelectMenuInteraction) {}
}
