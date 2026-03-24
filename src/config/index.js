import dotenv from "dotenv";
dotenv.config();

export const config = {
  telegramToken: process.env.BOT_TOKEN,
  youtubeCookiesPath: process.env.YOUTUBE_COOKIES_PATH,
};