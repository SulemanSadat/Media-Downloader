import ytdlp from "yt-dlp-exec";

export default async function facebook(url) {
  try {
    const directUrl = await ytdlp(url, { getUrl: true, format: "best" });
    return directUrl;
  } catch (err) {
    console.log("⚠️ Facebook extractor failed", err);
    return null; 
  }
}