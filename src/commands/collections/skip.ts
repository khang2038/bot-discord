import { servers } from "src/entities/Server";
import { CommandInteraction } from "discord.js";
import { messages } from "src/constants/message";

export const skip = {
  name: "chuyenbai",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.queue.length === 0) {
      await interaction.followUp(messages.noSongsInQueue);
    }
    await server.play();
    if (server.playing) {
      await interaction.followUp(messages.skippedSong);
    }
  },
};
