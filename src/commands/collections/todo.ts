import { CommandInteraction } from "discord.js";
import { createTodo } from "src/services/todo.service";

export const addTask = {
  name: "themtask",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try {
      await interaction.deferReply();
      const title = interaction.options.get("title")!.value! as string;
      const description = interaction.options.get("description")!
        .value! as string;
      const userTarget = interaction.options.get("target")!.value! as string;
      const owner = interaction.user.id;
      const todo = await createTodo({ title, description, userTarget, owner });
      await interaction.followUp(
        `title: ${todo.title}\n description: ${todo.description}\nuserTarget: ${todo.userTarget}\nowner: ${todo.owner}\n`
      );
    } catch (error) {
      console.log(error);
    }
  },
};
