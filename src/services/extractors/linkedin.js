import ytdlp from "yt-dlp-exec";

export default async function linkedin(url) {
  return await ytdlp(url, {
    getUrl: true,
    addHeader: ["User-Agent: Mozilla/5.0"],
  });
}