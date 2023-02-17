import { config } from "dotenv";
config();

if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import { Client, Intents } from "discord.js";
import { bootstrap } from "./commands";
import { play } from "./commands/collections/play";
import { messages } from "./constants/message";
import { help } from "./commands/collections/help";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

client.on("ready", () => {
  console.log(`> Bot is on ready`);
});

client.login(process.env.TOKEN).then(() => {
  bootstrap(client);

  client.on("interactionCreate", async (interaction) => {
    console.log(interaction);
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          play.execute(interaction);
          break;
        case help.name:
          help.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
});
