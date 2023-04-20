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
    name: "addremind",
    description: "tạo nhắc nhở!!!",
    options: [
      {
        name: "content",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "content",
        required: true,
      },
      {
        name: "months",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "month 1-12 or *",
        required: true,
      },
      {
        name: "dayofmonth",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "day of month 1-31 or *",
        required: true,
      },
      {
        name: "hours",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "at hour in day or *",
        required: true,
      },
      {
        name: "minutes",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "at minute in hour or *",
        required: true,
      },
      {
        name: "dayofweek",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "day of week Sun-Sat or * ",
        required: true,
      },
    ],
  },
  {
    name: "thoitiet",
    description: "xem thời tiết hôm nay!!!",
    options: [
      {
        name: "location",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "location",
        required: true,
      },
    ],
  },
  {
    name: "chatgpt",
    description: "giải đáp thắc mắc !!!",
    options: [
      {
        name: "input",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "hỏi đê",
        required: true,
      },
    ],
  },
  {
    name: "themtask",
    description: "task",
    options: [
      {
        name: "title",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "tiêu đề",
        required: true,
      },
      {
        name: "description",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "chi tiết",
        required: true,
      },
      {
        name: "target",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "người nhận",
        required: true,
      },
    ],
  },
  {
    name: "chuyenbai",
    description: "chuyển qua bài khác đê",
  },
  {
    name: "baylen",
    description: "bật chế độ bay lên",
  },
  {
    name: "danhsach",
    description: "xem danh sách",
  },
  {
    name: "listtask",
    description: "xem danh sách công việc",
    options: [
      {
        name: "user",
        type: Constants.ApplicationCommandOptionTypes.STRING,
        description: "danh sách của người được giao",
        required: true,
      },
    ],
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
    name: "tatnhac",
    description: "tatnhac",
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
        description: "vị trí trong danh sách",
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
        description: "vị trí trong danh sách",
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
