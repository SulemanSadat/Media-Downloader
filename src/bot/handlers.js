// src/bot/handlers.js
import { downloadVideo } from "../services/downloader.js";
import { detectPlatform } from "../services/platformDetector.js";
import fs from "fs";

export function registerHandlers(bot) {
  bot.start((ctx) => {
    ctx.reply(
     `🎬 Welcome to Media Downloader Bot!\n\n` +
      `I help you instantly download videos from your favorite platforms, including:\n` +
      `TikTok, Instagram, YouTube, Threads, LinkedIn, Facebook, and Pinterest.\n\n` +
      `📌 How it works:\n` +
      `Simply send me a video link, and I'll fetch it for you right here in Telegram.\n\n` +
      `⚡ Features:\n` +
      `- Lightning-fast downloads\n` +
      `- Direct video delivery\n` +
      `- Hassle-free, no extra apps needed\n\n` +
      `Get started by sending a video link now! 🚀`
    );
  });

  bot.on("text", async (ctx) => {
    const url = ctx.message.text.trim();
    const platform = detectPlatform(url);

    if (platform === "unknown") {
      return ctx.reply("❌ Unsupported URL. Please send a valid video link.");
    }

    let statusMessage;

    try {
      statusMessage = await ctx.reply(`🎬 Getting your ${platform} video ready…`);
      await ctx.sendChatAction("upload_video");

      const result = await downloadVideo(url);

   
      if (result.type === "direct") {
        await ctx.replyWithVideo(result.data, {
          caption: `✨Your ${platform} video is ready!`,
        });
      } else {
        await ctx.replyWithVideo(
          { source: result.data },
          { caption: `✨ Your ${platform} video is ready!` }
        );

        // cleanup
        if (fs.existsSync(result.data)) {
          fs.unlink(result.data, () => {});
        }
      }

      // delete status
      if (statusMessage?.message_id) {
        await ctx.deleteMessage(statusMessage.message_id);
      }
    } catch (err) {
      console.warn("⚠️ Video failed:", err.message);

      const msg =
        "❌ Failed to fetch video. It may be private, restricted, or unsupported.";

      if (statusMessage?.message_id) {
        try {
          await ctx.telegram.editMessageText(
            ctx.chat.id,
            statusMessage.message_id,
            undefined,
            msg
          );
        } catch {
          await ctx.reply(msg);
        }
      } else {
        await ctx.reply(msg);
      }
    }
  });
}