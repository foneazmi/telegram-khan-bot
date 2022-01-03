import TelegramBot from "node-telegram-bot-api";
import express from "express";
import { command } from "./command";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
export let bot;

if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.on("text", (msg) => {
  command(msg);
});
bot.on("callback_query", (msg) => {
  msg.message.text = msg.data;
  command(msg.message);
});

bot.on("polling_error", (error) => {
  // console.log(error);
});

bot.on("webhook_error", (error) => {
  // console.log(error.code);
});

const app = express();

app.use(express.json());

app.listen(process.env.PORT);

app.post("/" + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.post("/webhook", (req, res) => {
  let { query, body } = req;
  let message = `WEBHOOK from ${query.clientName}`;
  Object.keys(body).map((e) => {
    message += `\n${e} : ${JSON.stringify(body[e])}`;
  });
  bot.sendMessage(query.chatId, message);
  res.sendStatus(200);
});

app.post("/log", (req, res) => {
  let { query, body } = req;
  if (body instanceof Array) {
    body.map((element) => {
      bot.sendMessage(query.chatId, `${element}`);
    });
  } else {
    let message = JSON.stringify(body);
    bot.sendMessage(query.chatId, `${message}`);
  }
  res.sendStatus(200);
});

app.post("/fcm", ({ body }, res) => {
  fcm(body)
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });
  res.sendStatus(200);
});
