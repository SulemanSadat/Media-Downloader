import puppeteer from "puppeteer";

export default async function threads(url) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const page = await browser.newPage();

   
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Wait a bit for video to load
    await new Promise((r) => setTimeout(r, 3000));

    // Try to extract video URL
    const videoUrl = await page.evaluate(() => {
      const video = document.querySelector("video");
      return video ? video.src : null;
    });

    await browser.close();

    if (!videoUrl) {
      return null;
    }

    return videoUrl;
  } catch (err) {
    console.warn("⚠️ Threads puppeteer failed:", err.message);
    if (browser) await browser.close();
    return null;
  }
}