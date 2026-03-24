import ytdlp from "yt-dlp-exec";

export default async function instagram(url) {
  return await ytdlp(url, {
    getUrl: true,
    format: "best",
  });
}