import { Client } from "discord.js";
import { schema } from "../schema";

export const deploy = (client: Client): void => {
  client.on("messageCreate", async (message) => {
    if (!message.guild) {
      return;
    }
    if (!client.application?.owner) await client.application?.fetch();
    if (message.content.toLowerCase() === "!deploy") {
      try {
        await message.guild.commands.set(schema);
        await message.reply("Deployed!");
      } catch (e) {
        message.reply("Fail to deploy!");
      }
    }
    if (message.content.toLowerCase() === "!hello") {
      try {
        await message.reply("chào chick, chick muốn chụy bật bài giề!");
      } catch (e) {
        message.reply("Fail to deploy!");
      }
    }
  });
};
