import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 HTML serve করার জন্য (IMPORTANT)
app.use(express.static(__dirname));

// Telegram Bot
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("Bot started");

// Web root
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
