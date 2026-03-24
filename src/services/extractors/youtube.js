import ytdlp from "yt-dlp-exec";

export default async function youtube(url) {
  
  try {
    const info =await ytdlp(url, {
        format: "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4",
        output: tmpFile,
        quiet: true,
        cookies: "./cookies/cookies.txt", 
        });
    
    if (info.formats.some(f => f.acodec === "none" || f.vcodec === "none")) {
     
      return null; 
    }

  
    const best = info.formats.find(f => f.format_id === info.format_id) || info.formats[0];
    return best.url;

  } catch (err) {
    console.log("⚠️ YouTube extractor failed, fallback to merged stream", err);
    return null; 
  }
}