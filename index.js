import TelegramBot from "node-telegram-bot-api";
import express from "express";

const app = express();

// 🔑 তোমার BOT TOKEN এখানে বসাও
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// 👉 এটা খুব গুরুত্বপূর্ণ
console.log("Bot started");

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello 👋 Bot is working!");
});

// Render server alive রাখার জন্য
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
