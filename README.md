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

## 📦 Project Structure


src/
│
├── bot/
│ └── handlers.js # Telegram bot handlers
│
├── services/
│ ├── downloader.js # Main download logic
│ ├── platformDetector.js
│ └── extractors/
│    ├── tiktok.js
│    ├── instagram.js
│    ├── youtube.js
│    ├── facebook.js
│    ├── pinterest.js
│    ├── linkedin.js
│    └── threads.js
│
├── config/
│ └── index.js
│
└── index.js # Entry point


---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/media-downloader-bot.git
cd media-downloader-bot
npm install

🔐 Environment Variables

Create a .env file:

BOT_TOKEN=your_telegram_bot_token
▶️ Run the Bot
npm start

## 💬 Usage
Open your bot in Telegram
Send /start
Paste a video link
Get your video instantly 🎉

## ⚠️ Notes
Threads support is limited due to platform restrictions
Some platforms may require:
VPN 🌍
Public content access 🔓
Large videos may take longer to process

## 🚀 Deployment (Free)
Recommended:
Render (Background Worker)

Start Command:

node src/index.js

🧠 How It Works
Detect platform from URL
Try direct extractor (fast)
Fallback to yt-dlp
Send video to Telegram
Clean up temp files

📌 Future Improvements
 Add Puppeteer for Threads support
 Proxy support for restricted platforms
 Queue system for scaling
 Database for analytics

## 🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first.

## 📄 License
MIT License

## 👨‍💻 Author
Suleman Sadat
Software Engineer | Full-Stack Developer

## ⭐ Support
If you like this project, give it a ⭐ on GitHub!