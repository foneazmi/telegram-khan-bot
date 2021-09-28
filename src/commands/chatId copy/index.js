import { bot } from "../../app";

export const chatId = (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id, {
    reply_markup: {
      keyboard: [["/home"]],
    },
  });
};
