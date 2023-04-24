import { CommandInteraction } from "discord.js";
import { config } from "dotenv";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
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
      const messages: ChatCompletionRequestMessage[] = [];
      const input = interaction.options.get("input")!.value! as string;
      const prevInput = await interaction.channel?.messages.fetch({
        limit: 10,
      });
      prevInput?.each((item) => {
        messages.push({
          role: "user",
          content: item.content,
        });
      });
      messages.reverse();
      messages.pop();
      messages.push({
        role: "user",
        content: input,
      });
      const answer = (await runCompletion(messages)) as string;
      await interaction.followUp(`${input}\n\`\`\`${answer}\`\`\``);
    } catch (error) {
      console.log(error)
      await interaction.followUp(`máy chủ của chatgpt lỗi òi`);
    }
  },
};

async function runCompletion(message: ChatCompletionRequestMessage[]) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: message,
  });
  return completion.data.choices[0].message?.content;
}
