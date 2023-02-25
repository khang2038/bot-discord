import { EmbedFieldData, MessageEmbed } from "discord.js";
import { messages } from "src/constants/message";
import { platform } from "src/interfaces/song.interface";
import { formatSeconds } from "src/util/formatTime";

export const createPlayMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  type: "Song" | "Playlist";
  length: number;
  platform: platform;
  requester: string;
}): MessageEmbed => {
  const author: EmbedFieldData = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const length: EmbedFieldData = {
    name: messages.length,
    value:
      payload.type === "Playlist"
        ? payload.length.toString()
        : formatSeconds(payload.length),
    inline: true,
  };
  const type: EmbedFieldData = {
    name: messages.type,
    value: payload.type,
    inline: true,
  };
  return new MessageEmbed()
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor(`${messages.addedToQueue} ${payload.requester}`)
    .setThumbnail(payload.thumbnail)
    .addFields(author, length, type);
};
