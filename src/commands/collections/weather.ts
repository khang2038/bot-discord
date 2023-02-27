import axios from "axios";
import { CommandInteraction } from "discord.js";
import { config } from "dotenv";
import { weatherMessage } from "../messages/weatherMessage";
config();

const gettingWeatherDetail = async (id: string) => {
  const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${process.env.Weather_API_KEY}`;

  const res = await axios.get(baseUrl + query);
  const data = await res.data;

  return data[0];
};

const getCity = async (city: string) => {
  const baseUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${process.env.Weather_API_KEY}&q=${city}`;

  const res = await axios.get(baseUrl + query);
  const data = await res.data;

  return data[0];
};

const updateCity = async (city: string) => {
  const cityDetails = await getCity(city);
  const cityWeather = await gettingWeatherDetail(cityDetails.Key);

  return {
    cityDetails,
    cityWeather,
  };
};

export const weather = {
  name: "thoitiet",
  execute: async (interaction: CommandInteraction): Promise<void> => {
    try {
      await interaction.deferReply();
      const input = (
        interaction.options.get("thanhpho")!.value! as string
      ).trim();
      const info = await updateCity(input);
      const cityDetails = info.cityDetails;
      const weather = info.cityWeather;
      const cityName = cityDetails.EnglishName;
      const detail = weather.WeatherText;
      const temperature = weather.Temperature.Metric.Value;
      const IsDayTime = weather.IsDayTime as boolean;
      await interaction.followUp({
        embeds: [weatherMessage({ cityName, detail, temperature, IsDayTime })],
      });
    } catch (error) {
      await interaction.followUp("thử tìm lại xem");
    }
  },
};
