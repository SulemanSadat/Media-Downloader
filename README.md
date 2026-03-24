# 🎬 Media Downloader Bot

A powerful Telegram bot that instantly downloads videos from popular platforms and delivers them directly in chat.

---

## 🚀 Features

- 📥 Download videos from:
  - TikTok
  - Instagram
  - YouTube
  - Facebook
  - Pinterest
  - LinkedIn
  - Threads *(limited support)*
- ⚡ Fast and automated processing
- 🎥 Direct video delivery in Telegram
- 🧠 Smart platform detection
- 🗂 Temporary file handling & cleanup

---

## 🛠 Tech Stack

- **Node.js**
- **Telegraf (Telegram Bot API)**
- **yt-dlp**
- **Custom Extractors (per platform)**

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/SulemanSadat/Media-Downloader.git
cd media-downloader
```  
Install dependencies
```bash
npm install
```  
## Set up environment variables

Create a .env file in the root folder:

```bash
BOT_TOKEN=your_telegram_bot_token
```  
Run the bot

```bash
npm start
```  
## 💬 Usage
Open your bot in Telegram
Send /start
Paste a video link
Receive your video instantly 🎉

## ⚠️ Notes
Threads support is limited due to platform restrictions
Some platforms may require:
VPN 🌍
Public content access 🔓
Large videos may take longer to process

## 🚀 Deployment (Free)

Recommended: Render (Background Worker)

Start command:

```bash
node src/index.js
``` 
How it works:
Detect platform from URL
Try direct extractor (fast)
Fallback to yt-dlp if needed
Send video to Telegram
Clean up temporary files

Future improvements:
Add Puppeteer for better Threads support
Proxy support for restricted platforms
Queue system for scaling
Database for analytics

## 🤝 Contributing
Pull requests are welcome.
For major changes, please open an issue first.

## 📄 License
MIT License

## 👨‍💻 Author
Suleman Sadat
Software Engineer | Full-Stack Developer

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!