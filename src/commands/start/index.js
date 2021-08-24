import { bot } from "../../app";

export const start = (e) => {
  let messages = `List Command 
  /wallhaven -h
  /chatId
  `;
  bot.sendMessage(e.chat.id, messages);
};
