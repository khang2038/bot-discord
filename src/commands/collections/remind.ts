import { CommandInteraction } from "discord.js";
import { config } from "dotenv";
import { CreateTodoDto } from "src/dto/todo/create-todo.dto";
import validationMiddleware from "src/middlewares/validation.middleware";
import { remindMessage } from "../messages/remindMessage";
import { CronJob } from "cron";
import { notificationMessage } from "../messages/notificationMessage";
config();
const months = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const addRemind = {
  name: "addremind",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try {
      await interaction.deferReply();
      const content = (
        interaction.options.get("content")!.value! as string
      ).trim();
      const month = interaction.options.get("months")!.value! as string;
      const dayOfMonth = interaction.options.get("dayofmonth")!
        .value! as string;
      const hours = interaction.options.get("hours")!.value! as string;
      const minute = interaction.options.get("minutes")!.value! as string;
      const dayOfWeek = interaction.options.get("dayofweek")!.value! as string;

      const dto = new CreateTodoDto();

      Object.assign(dto, {
        content,
        month,
        dayOfMonth,
        hours,
        minute,
        dayOfWeek,
      });

      validationMiddleware(CreateTodoDto, dto);

      let newMonth;

      if (months.includes(Number(month))) {
        newMonth = months.indexOf(Number(month));
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      var job = new CronJob(
        `00 ${minute} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`,
        function () {
          interaction.followUp({
            embeds: [
              notificationMessage({
                content,
                requester: interaction.member?.user.username as string,
                month,
                dayOfMonth,
                hours,
                minute,
                dayOfWeek,
              }),
            ],
          });
        },
        null,
        true,
        timezone
      );

      job.start();

      await interaction.followUp({
        embeds: [
          remindMessage({
            content,
            requester: interaction.member?.user.username as string,
            month,
            dayOfMonth,
            hours,
            minute,
            dayOfWeek,
          }),
        ],
      });
    } catch (error) {
      await interaction.followUp(error as string);
    }
  },
};
