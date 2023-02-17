import { Constants, ApplicationCommandData } from "discord.js";

export const schema: ApplicationCommandData[] = [
  {
    name: "lennhac",
    description: "cho tên bài nào chiến xem nào!!!",
    options: [
      {
        name: "input",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "tìm đê",
        required: true,
      },
    ],
  },
  {
    name: "chuyenbai",
    description: "chuyển qua bài khác đê",
  },
  {
    name: "danhsach",
    description: "xem danh sách",
  },
  {
    name: "dunglai",
    description: "đừng dừng lại",
  },
  {
    name: "tieptuc",
    description: "gáy tiếp e ei",
  },
  {
    name: "roi",
    description: "rời đi",
  },
  {
    name: "nowplaying",
    description: "bài hát hiện tại đang bật",
  },
  {
    name: "jump",
    description: "nhảy bài",
    options: [
      {
        name: "position",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
        description: "The position of song in queue",
        required: true,
      },
    ],
  },
  {
    name: "remove",
    description: "xóa bài",
    options: [
      {
        name: "position",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
        description: "The position of song in queue",
        required: true,
      },
    ],
  },
  {
    name: "ping",
    description: "xem ping",
  },
  {
    name: "help",
    description: "tìm hiểu lệnh bot",
  },
];
