import axios from "axios";
import { bot } from "../../app";
import qs from "qs";
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

export const wallhaven = async (msg) => {
  let query = msg.text.split(" ").slice(1);
  let payload = queryFilter(query);
  let isPageFound = query.find((e) => e.includes("page"));

  var newQuery = query.filter((e) => !e.includes("page"));
  let each = isPageFound && isPageFound.split(":");

  let pagination =
    each && Number(each[1]) > 1
      ? [
          `/wall page:${Number(each[1]) - 1} ${newQuery.join(" ")}`,
          `/wall page:${Number(each[1]) + 1} ${newQuery.join(" ")}`,
        ]
      : [`/wall page:2 ${newQuery.join(" ")}`];

  let data = await axios.get(
    `https://wallhaven.cc/api/v1/search?${qs.stringify(payload)}`
  );

  data.data.data.map((e) => {
    bot.sendPhoto(msg.chat.id, e.path, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [pagination, ["/home"]],
      },
      caption: `${e.resolution} - ${e.purity} - page ${
        each && Number(each[1]) ? Number(each[1]) : 1
      }`,
    });
  });
};
