import { servers } from "src/entities/Server";
import { CommandInteraction } from "discord.js";
import { messages } from "src/constants/message";

export const leave = {
  name: "tatnhac",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    server.leave();
    await interaction.followUp(messages.leaved);
  },
};
