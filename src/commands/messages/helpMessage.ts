import { schema } from "src/commands/schema";
import { MessageEmbed } from "discord.js";
import { messages } from "src/constants/message";

export const createHelpMessage = (): MessageEmbed => {
  const embedMessage = new MessageEmbed({
    title: messages.help,
    fields: schema.map((item, index) => ({
      name: `${index + 1}. ${item.name}`,
      value: `${item.name}`,
    })),
  });
  return embedMessage;
};
