import { bot } from "../../app";
import { Keyboard, Key } from "telegram-keyboard";

export const start = (msg) => {
  let keys = Keyboard.reply([
    Key.callback(`/wall`),
    Key.callback(`/id`),
    Key.callback(`/fb`),
  ]);
  let messages = "List Command";
  bot.sendMessage(msg.chat.id, messages, keys);
};
