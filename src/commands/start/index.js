import { bot } from "../../app";

export const start = (msg) => {
  let messages = "List Command";
  bot.sendMessage(msg.chat.id, messages, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [["/wall", "/id", "/fb"]],
    },
  });
};
