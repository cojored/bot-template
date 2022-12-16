import { CommandInteraction, Message } from "discord.js";
import SlashCommand from "../../Types/Classes/SlashCommand.js";

function run(data: CommandInteraction | Message) {
  data.reply("test");
}

let command = new SlashCommand({
  name: "test-slash",
  description: "test slash command",
});

command.execute(run);

export default command;
