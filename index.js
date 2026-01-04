import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

// ===== Path setup (ES Module fix) =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Serve static files (index.html) =====
app.use(express.static(__dirname));

// ===== Telegram Bot =====
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("Bot started");

// ===== /start command =====
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "👇 Click the button to open Mini App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "▶️ Open Mini App",
            web_app: {
              url: "https://YOUR-RENDER-URL.onrender.com/index.html"
            }
          }
        ]
      ]
    }
  });
});

// ===== Root route =====
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
