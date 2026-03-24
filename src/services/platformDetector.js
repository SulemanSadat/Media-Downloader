// src/services/platformDetector.js
export function detectPlatform(url) {
  url = url.toLowerCase();

  if (/tiktok\.com|vm\.tiktok\.com/.test(url)) return "tiktok";
  if (/instagram\.com/.test(url)) return "instagram";
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/threads\.com/.test(url)) return "threads";
  if (/linkedin\.com/.test(url)) return "linkedin";
  if (/facebook\.com/.test(url)) return "facebook";
  if (/pinterest\.com|pin\.it/.test(url)) return "pinterest";  

  return "unknown";
}