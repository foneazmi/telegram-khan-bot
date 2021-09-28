import { bot } from "../../app";
export const firebase = (msg) => {
  bot.sendMessage(msg.chat.id, msg.text, {
    reply_markup: {
      keyboard: [["/home"]],
    },
  });
};
