import { bot } from "../../app";

export const commandKhan = (e) => {
  bot.sendMessage(e.chat.id, e.chat.id);
};
