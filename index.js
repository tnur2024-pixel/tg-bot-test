import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = "https://tg-bot-test-3.onrender.com"; // 🔴 change this

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);

app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👇 Open Mini App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Mini App 🚀",
            web_app: { url: WEBHOOK_URL }
          }
        ]
      ]
    }
  });
});

// DATA FROM MINI APP
bot.on("web_app_data", (msg) => {
  if (msg.web_app_data.data === "watch_ad") {
    bot.sendMessage(msg.chat.id, "👇 Watch Ad", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Watch Ads 🎥",
              callback_data: "show_ad"
            }
          ]
        ]
      }
    });
  }
});

// AD TRIGGER (ZONE ID handled by Monetag)
bot.on("callback_query", (q) => {
  if (q.data === "show_ad") {
    bot.answerCallbackQuery(q.id);
    bot.sendMessage(
      q.message.chat.id,
      "⏳ Ad loading...\nPlease wait"
    );
    // Monetag TG system auto handles Zone ID = 10416174
  }
});

app.get("/", (req, res) => {
  res.send("Mini App is Live 🚀");
});

app.listen(PORT, () => {
  console.log("Server running");
});
