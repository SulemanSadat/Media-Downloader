// src/services/extractors/pinterest.js
import fetch from "node-fetch";
import execa from "execa"; // ✅ correct import

export default async function pinterest(url) {
  try {
    // Resolve short URL if needed
    if (url.includes("pin.it")) {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status === 301 || res.status === 302) {
        url = res.headers.get("location");
      }
    }

    // Use yt-dlp to get direct URL
    const { stdout } = await execa("yt-dlp", ["-g", url]); // -g gives direct video URL
    const videoUrl = stdout.trim();

    return videoUrl;
  } catch (err) {
    // Don't throw; fallback will handle it
    console.warn("⚠️ Pinterest extractor failed:", err.message);
    return null;
  }
}