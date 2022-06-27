import { bot } from "../../app";

export const chatId = (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Home`,
            callback_data: `/start`,
          },
        ],
      ],
    },
  });
};
