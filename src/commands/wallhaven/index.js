import axios from "axios";
import { bot } from "../../app";
import qs from "qs";
import { Keyboard, Key } from "telegram-keyboard";

const queryFilter = (rawQuery) => {
  let query = {};
  rawQuery.map((e) => {
    let each = e.split(":");
    if (each[0] === "q") {
      query = { ...query, q: each[1] };
    } else if (each[0] === "categories") {
      query = { ...query, categories: each[1] };
    } else if (each[0] === "purity") {
      query = { ...query, purity: each[1] };
    } else if (each[0] === "sorting") {
      query = { ...query, sorting: each[1] };
    } else if (each[0] === "order") {
      query = { ...query, order: each[1] };
    } else if (each[0] === "topRange") {
      query = { ...query, topRange: each[1] };
    } else if (each[0] === "atleast") {
      query = { ...query, atleast: each[1] };
    } else if (each[0] === "resolutions") {
      query = { ...query, resolutions: each[1] };
    } else if (each[0] === "ratios") {
      query = { ...query, ratios: each[1] };
    } else if (each[0] === "colors") {
      query = { ...query, colors: each[1] };
    } else if (each[0] === "page") {
      query = { ...query, page: each[1] };
    } else if (each[0] === "seed") {
      query = { ...query, seed: each[1] };
    } else if (each[0] === "nsfw") {
      query = {
        ...query,
        apikey: "FCJnF4ambSJaBsD9vbp7ePLiHlvNw6R8",
        purity: "001",
      };
    }
  });
  return query;
};

export const wallhaven = (msg) => {
  let query = msg.text.split(" ").slice(1);
  if (query[0] === "-h") {
    let messages = `
    /wall q:<*> categories:<*> purity:<*>  sorting:<*> order:<*> topRange:<*> atleast:<*> resolutions:<*> ratios:<*> colors:<*> page:<*> seed:<*>
    =================================
    q:<search> - Search query, Your main way of finding what you're looking for
    categories:<100/101/111/etc (general/anime/people)> - Turn categories on(1) or off(0)
    purity:<100*/110/111/etc (sfw/sketchy/nsfw)> - Turn purities on(1) or off(0) NSFW requires a valid API key
    sorting:<date_added*, relevance, random, views, favorites, toplist> - Method of sorting results
    order:<desc*, asc> - Sorting order
    topRange:<1d, 3d, 1w,1M*, 3M, 6M, 1y> - Sorting MUST be set to 'toplist'
    atleast:<1920x1080> - Minimum resolution allowed
    resolutions:<1920x1080,1920x1200> - List of exact wallpaper resolutions Single resolution allowed
    ratios:<16x9,16x10> - List of aspect ratios Single ratio allowed
    colors:<cccccc/ffffff> - Search by color
    page:<1-n> - Pagination Not actually infinite
    seed:<[a-zA-Z0-9]{6}> - Optional seed for random results
    `;
    bot.sendMessage(msg.chat.id, messages);
  } else {
    let payload = queryFilter(query);
    let isPageFound = query.find((e) => e.includes("page"));

    var newQuery = query.filter((e) => !e.includes("page"));
    let each = isPageFound && isPageFound.split(":");

    if (each && each[1] > 1) {
      const keyboard = Keyboard.make([
        Key.callback(
          "Back",
          `/wallhaven page:${Number(each[1]) - 1} ${newQuery.join(" ")}`
        ),
        Key.callback(
          "Next",
          `/wallhaven page:${Number(each[1]) + 1} ${newQuery.join(" ")}`
        ),
      ]).inline();
      bot.sendMessage(
        msg.chat.id,
        `Wallhaven page:${each[1]} ${newQuery.join(" ")}`,
        keyboard
      );
    } else {
      const keyboard = Keyboard.make([
        Key.callback("Next", `/wallhaven page:2 ${newQuery.join(" ")}`),
      ]).inline();
      bot.sendMessage(
        msg.chat.id,
        `Wallhaven page:1 ${newQuery.join(" ")}`,
        keyboard
      );
    }

    axios
      .get(`https://wallhaven.cc/api/v1/search?${qs.stringify(payload)}`)
      .then((f) => {
        f.data.data.forEach((e) => {
          console.log(e);
          bot.sendPhoto(msg.chat.id, e.path, {
            caption: `${e.resolution} - ${e.purity}`,
          });
        });
      });
  }
};
