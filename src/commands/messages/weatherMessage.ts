import { EmbedFieldData, MessageEmbed } from "discord.js";

export const weatherMessage = (payload: {
  cityName: string;
  detail: string;
  temperature: string;
  IsDayTime: boolean;
}): MessageEmbed => {
  const detail: EmbedFieldData = {
    name: "detail",
    value: payload.detail,
  };
  const temperature: EmbedFieldData = {
    name: "temperature",
    value: `${payload.temperature}°C`,
  };

  return new MessageEmbed()
    .setTitle(payload.cityName)
    .setColor("GREEN")
    .setThumbnail(setImg(payload.IsDayTime))
    .setAuthor(`the weather today`)
    .addFields(detail, temperature);
};

const setImg = (IsDayTime: boolean) => {
  if (IsDayTime) {
    return "https://previews.123rf.com/images/carbo82/carbo821206/carbo82120600087/14194624-icon-sunny-weather.jpg";
  }
  return "https://cdn-icons-png.flaticon.com/256/5825/5825726.png";
};
