import { CommandInteraction } from "discord.js";
import { createTodo, getTodos } from "src/services/todo.service";
import { createtaskMessage, listTaskMessage } from "../messages/TaskMessage";

export const addTask = {
  name: "themtask",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try {
      await interaction.deferReply();
      const title = interaction.options.get("title")!.value! as string;
      const description = interaction.options.get("description")!
        .value! as string;
      let userTarget = interaction.options.get("target")!.value! as string;
      userTarget = userTarget.split("@")[1].slice(0, -1);
      const chanel = interaction.guildId as string;
      const owner = interaction.user.id;
      const todo = await createTodo({
        title,
        description,
        user_target: userTarget,
        owner,
        chanel,
      });
      interaction.followUp({
        embeds: [
          createtaskMessage({
            title: todo.title,
            description: todo.description,
            target: `<@${todo.user_target}>`,
            owner: `<@${todo.owner}>`,
            requester: interaction.member?.user.username as string,
          }),
        ],
      });
    } catch (error) {
    }
  },
};

export const listTask = {
  name: "listtask",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try {
      await interaction.deferReply();
      let userTarget = interaction.options.get("user")!.value! as string;
      userTarget = userTarget.split("@")[1].slice(0, -1);
      const { todos, count } = await getTodos(
        interaction.guildId as string,
        userTarget
      );
      const user = (await interaction.client.users.fetch(userTarget)).username;
      await interaction.followUp({
        embeds: [listTaskMessage({ todos, userTarget: user })],
      });
    } catch (error) {
      await interaction.followUp("@ để xác định người");
    }
  },
};
