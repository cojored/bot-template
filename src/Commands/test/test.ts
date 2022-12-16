import { CommandInteraction, Message } from "discord.js";
import MessageCommand from "../../Types/Classes/MessageCommand.js";

function run(data: CommandInteraction | Message) {
  data.reply("test");
}

let command = new MessageCommand({
  name: "test",
  description: "test slash command",
  aliases: ["t", "te"],
});

command.execute(run);

export default command;
