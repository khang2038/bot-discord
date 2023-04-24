import { EmbedFieldData, MessageEmbed } from "discord.js";
import { EDayOfWeek } from "src/interfaces/remind.interface";

export const notificationMessage = (payload: {
  content: string;
  requester: string;
  month: string;
  dayOfMonth: string;
  hours: string;
  minute: string;
  dayOfWeek: string;
}): MessageEmbed => {
  let value: string = "";
  if (payload.hours !== "*") {
    value = value + `${payload.hours} giờ`;
  }
  if (payload.minute !== "*") {
    value = value + ` ${payload.minute} phút`;
  }
  if (payload.dayOfWeek !== "*") {
    value = value + ` ${payload.dayOfWeek}`;
  }
  if (payload.dayOfMonth !== "*") {
    value = value + ` ngày ${payload.dayOfMonth}`;
  }
  if (payload.month !== "*") {
    value = value + ` tháng ${payload.month}`;
  }
  const time: EmbedFieldData = {
    name: "vào lúc",
    value: value,
    inline: true,
  };
  return new MessageEmbed()
    .setTitle(payload.content)
    .setColor("ORANGE")
    .setThumbnail(
      "https://babich.biz/content/images/size/w2000/2016/03/1-c3cQvYJrVezv_Az0CoDcbA.jpeg"
    )
    .addFields(time)
    .setAuthor(`Thông báo nè nghe đây!!!!!!!!!`);
};
