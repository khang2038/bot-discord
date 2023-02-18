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
import { leave } from "./commands/collections/leave";
import { chatGPT } from "./commands/collections/chatGPT";
import { skip } from "./commands/collections/skip";

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
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          play.execute(interaction);
          break;
        case help.name:
          help.execute(interaction);
          break;
        case leave.name:
          leave.execute(interaction);
          break;
        case chatGPT.name:
          chatGPT.execute(interaction);
          break;
        case skip.name:
          skip.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
});
