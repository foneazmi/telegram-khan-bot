import { bot } from "../../app";

export const chatId = (e) => {
  bot.sendMessage(e.chat.id, e.chat.id);
};
