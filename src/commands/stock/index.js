import { bot } from "../../app";
import { api } from "../../services";
import { Keyboard } from "telegram-keyboard";

export const stock = async (msg) => {
  let query = msg.text.split(" ").slice(1);

  console.log(query);

  if (false) {
    let response = await api.search({
      query: "ESSA",
    });
    let res = response.data.ResultSet.Result;
    let keyboardButton = [];

    res.map((e) => keyboardButton.push(`$${e.symbol}`));

    const keyboard = Keyboard.make(keyboardButton, {
      flat: true,
      columns: 2,
    }).reply();

    bot.sendMessage(msg.chat.id, msg.chat.id, {
      ...keyboard,
    });
  }
};
