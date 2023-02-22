import { CommandInteraction } from "discord.js";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const chatGPT = {
  name: "chatgpt",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try {
      await interaction.deferReply();
      const input = interaction.options.get("input")!.value! as string;
      const answer = (await runCompletion(input)) as string;
      await interaction.followUp(`${input}\n\`\`\`${answer}\`\`\``);
    } catch (error) {
      await interaction.followUp(`máy chủ của chatgpt lỗi òi`);
    }
  },
};

async function runCompletion(message: string) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 700,
  });
  return completion.data.choices[0].text;
}
