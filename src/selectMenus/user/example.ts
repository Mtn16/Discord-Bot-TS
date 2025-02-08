import { UserSelectMenuBuilder, UserSelectMenuInteraction } from "discord.js";
import { UserSelectMenu } from "../../types/SelectMenu";

export default class ExampleUserSelectMenu implements UserSelectMenu {
     customId = "example_select_user"
     data = new UserSelectMenuBuilder()
     async execute (interaction: UserSelectMenuInteraction) {}
}
