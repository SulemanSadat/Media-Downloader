import ytdlp from "yt-dlp-exec";

export default async function tiktok(url) {
  return await ytdlp(url, {
    getUrl: true,
    format: "best",
  });
}