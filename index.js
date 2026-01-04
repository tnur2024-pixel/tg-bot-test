import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = "https://tg-bot-test-2.onrender.com";

// 🔹 IMPORTANT: body parser MUST be on top
app.use(express.json());

// path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static files
app.use(express.static(__dirname));

// Telegram bot (webhook mode)
const bot = new TelegramBot(BOT_TOKEN);

// set webhook
bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);
console.log("Webhook set");

// webhook endpoint
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// /start command ✅
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👇 Open Mini App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Mini App 🚀",
            web_app: {
              url: WEBHOOK_URL
            }
          }
        ]
      ]
    }
  });
});

// root
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
