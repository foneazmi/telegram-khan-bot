import axios from "axios";
import { bot } from "../../app";

export const hiperdex = async (msg) => {
  bot.sendMessage(msg.chat.id, `hi from hiperdex ${page}`, {
    // reply_markup: {
    //   resize_keyboard: true,
    //   // keyboard: [pagination, ["/home"]],
    // },
  });

  // data.data.data.map((e, index) => {
  //   bot.sendPhoto(msg.chat.id, e.path, {
  //     caption: `page ${index}/${page}`,
  //   });
  // });
};
