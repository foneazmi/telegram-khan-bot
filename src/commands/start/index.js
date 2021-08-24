import { bot } from "../../app";

export const commandStart = (e) => {
  let messages = `List Command 
  /wall -h`;
  bot.sendMessage(e.chat.id, messages);
};
