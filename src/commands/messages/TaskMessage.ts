import { EmbedFieldData, MessageEmbed } from "discord.js";
import { messages } from "src/constants/message";
import { Todo } from "src/entities";

export const createtaskMessage = (payload: {
  title: string;
  description: string;
  owner: string;
  target: string;
  requester: string;
}): MessageEmbed => {
  const owner: EmbedFieldData = {
    name: messages.owner,
    value: payload.owner,
    inline: true,
  };
  const description: EmbedFieldData = {
    name: messages.description,
    value: payload.description,
    inline: true,
  };
  const target: EmbedFieldData = {
    name: messages.userTarget,
    value: payload.target,
    inline: true,
  };
  return new MessageEmbed()
    .setTitle(payload.title)
    .setColor("GREEN")
    .setThumbnail("https://cdn-icons-png.flaticon.com/512/2098/2098402.png")
    .setAuthor(`${messages.addTaskBy} ${payload.requester}`)
    .addFields(owner, description, target);
};

export const listTaskMessage = (payload: { todos: Todo[] }): MessageEmbed => {
  const embedMessage = new MessageEmbed({
    title: messages.listTask,
    color: "DARK_BLUE",
    fields: payload.todos.map((item, index) => ({
      name: `${index + 1}. ${item.title}`,
      value: `${item.description}`,
    })),
  }).setThumbnail("https://cdn-icons-png.flaticon.com/512/2098/2098402.png");
  return embedMessage;
};
