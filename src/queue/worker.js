import { Worker } from "bullmq";
import { downloadVideo } from "../services/downloader.js";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("🚀 Worker started...");

const worker = new Worker(
  "download", // make sure this matches your queue name
  async (job) => {
    const { url, userId } = job.data;

    console.log("📥 Processing:", url);

    try {
      // Download the video
      const filePath = await downloadVideo(url);
      console.log("📁 File path:", filePath);

      // Ensure file exists
      if (!fs.existsSync(filePath)) {
        throw new Error("File not found after download");
      }

      console.log("📤 Sending video...");

      // Send the video to the user
      await bot.telegram.sendVideo(userId, {
        source: filePath
      });

      console.log("✅ Sent!");

      // Optional: delete file after sending to save space
      fs.unlink(filePath, (err) => {
        if (err) console.error("⚠️ Failed to delete file:", err);
        else console.log("🗑️ Deleted temporary file:", filePath);
      });

      return { filePath };

    } catch (err) {
      console.error("❌ Worker error:", err);

      // Inform the user
      await bot.telegram.sendMessage(userId, `❌ Failed to download video.\n${err.message}`);

      throw err;
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);

// Event listeners
worker.on("completed", () => {
  console.log("✅ Job completed");
});

worker.on("failed", (job, err) => {
  console.log("❌ Job failed:", err.message);
});