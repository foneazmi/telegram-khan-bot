import { bot } from "../../app";
import { Keyboard, Key } from "telegram-keyboard";

export const start = (e) => {
  let keys = Keyboard.reply([
    Key.callback(`/wall`),
    Key.callback(`/id`),
    // Key.callback(`/yt`),
  ]);
  let messages = "List Command";
  bot.sendMessage(e.chat.id, messages, keys);
};
