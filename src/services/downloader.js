// src/services/downloader.js
import fs from "fs";
import path from "path";
import os from "os";
import ytdlp from "yt-dlp-exec";

import tiktok from "./extractors/tiktok.js";
import instagram from "./extractors/instagram.js";
import threads from "./extractors/threads.js";
import linkedin from "./extractors/linkedin.js";
import youtube from "./extractors/youtube.js";
import facebook from "./extractors/facebook.js";
import pinterest from "./extractors/pinterest.js";

import { detectPlatform } from "./platformDetector.js";
import { config } from "../config/index.js";

const extractors = {
  tiktok,
  instagram,
  threads,
  linkedin,
  youtube,
  facebook,
  pinterest,
};

// yt-dlp fallback
async function ytDlpHandler(url, platform) {
  const tmpFile = path.join(os.tmpdir(), `video_${Date.now()}.mp4`);

  const options = {
    output: tmpFile,
    quiet: true,
  };

  // ⚡ Let yt-dlp auto choose best format (better compatibility)
  // DO NOT force format (fixes many issues)

  if (platform === "youtube") {
    if (config.youtubeCookiesPath && fs.existsSync(config.youtubeCookiesPath)) {
      options.cookies = config.youtubeCookiesPath;
    } else {
      options["cookies-from-browser"] = "chrome";
    }
  }

  try {
    await ytdlp(url, options);

    return {
      type: "file",
      data: tmpFile,
      platform,
    };
  } catch (err) {
    console.warn(`⚠️ yt-dlp failed for ${platform}:`, err.message);
    throw new Error("Download failed");
  }
}

export async function downloadVideo(url) {
  const platform = detectPlatform(url);

  if (platform === "unknown") {
    throw new Error("Unsupported platform");
  }

  // ✅ THREADS (NO yt-dlp)
  if (platform === "threads") {
    const directUrl = await extractors.threads(url);

    if (directUrl) {
      return { type: "direct", data: directUrl, platform };
    }

    throw new Error("Threads video not accessible");
  }

  // ✅ OTHER PLATFORMS → try extractor first
  if (extractors[platform]) {
    try {
      const directUrl = await extractors[platform](url);

      if (directUrl) {
        return { type: "direct", data: directUrl, platform };
      }
    } catch (err) {
      console.warn(`⚠️ Extractor failed for ${platform}:`, err.message);
    }
  }

  // ✅ fallback
  return await ytDlpHandler(url, platform);
}