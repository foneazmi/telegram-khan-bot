import { bot } from "../../app";

export const start = (msg) => {
  let messages = "List Command";
  bot.sendMessage(msg.chat.id, messages, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Wallpaper`,
            callback_data: `/wall`,
          },
          {
            text: `Get ID`,
            callback_data: `/id`,
          },
          {
            text: `Hiperdex`,
            callback_data: `/hd`,
          },
        ],
      ],
    },
  });
};
