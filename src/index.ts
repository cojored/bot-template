import CMDHandler from "./Handlers/CommandHandler.js";
import {
  Client,
  Partials,
  GatewayIntentBits,
} from "discord.js";
import config from "../config.json" assert { type: "json" };

export const client = new Client({
  intents: [
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildBans
  ],
  partials: [Partials.Message],
});
export const CommandHandler = new CMDHandler(config.prefix);

client.on("ready", async () => {
  client?.application?.commands.set(CommandHandler.slashCommands);
  console.log("Ready!");
});

client.on("messageCreate", (message) =>
  CommandHandler.proccessAndRunMessage(message)
);

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand())
    CommandHandler.executeCommand(interaction.commandName, interaction);
  else if (interaction.isAutocomplete())
    CommandHandler.handleInteraction(interaction.commandName, interaction);
  else
    CommandHandler.handleInteraction(
      interaction?.customId?.split("|")[0],
      interaction
    );
});

client.login(config.token);
