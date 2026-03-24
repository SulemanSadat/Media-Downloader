import { Telegraf } from "telegraf";
import { registerHandlers } from "./bot/handlers.js";
import { config } from "./config/index.js";
import { testConnection } from "./db/postgres.js";

await testConnection(); // test DB

const bot = new Telegraf(config.telegramToken);
registerHandlers(bot);

bot.launch();
console.log("🤖 Bot is running...");