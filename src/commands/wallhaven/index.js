import axios from "axios";
import { bot } from "../../app";
import qs from "qs";
const queryFilter = (rawQuery) => {
  let query = {};
  rawQuery.map((e) => {
    let each = e.split(":");
    if (each[0] === "q") {
      query = { ...query, q: each[1] };
    } else if (each[0] === "cat") {
      query = { ...query, categories: each[1] };
    } else if (each[0] === "pur") {
      query = { ...query, purity: each[1] };
    } else if (each[0] === "sort") {
      query = { ...query, sorting: each[1] };
    } else if (each[0] === "ord") {
      query = { ...query, order: each[1] };
    } else if (each[0] === "tr") {
      query = { ...query, topRange: each[1] };
    } else if (each[0] === "al") {
      query = { ...query, atleast: each[1] };
    } else if (each[0] === "res") {
      query = { ...query, resolutions: each[1] };
    } else if (each[0] === "rat") {
      query = { ...query, ratios: each[1] };
    } else if (each[0] === "col") {
      query = { ...query, colors: each[1] };
    } else if (each[0] === "page") {
      query = { ...query, page: each[1] };
    } else if (each[0] === "seed") {
      query = { ...query, seed: each[1] };
    } else if (each[0] === "nsfw") {
      query = {
        ...query,
        apikey: "FCJnF4ambSJaBsD9vbp7ePLiHlvNw6R8",
        purity: "011",
      };
    }
  });
  return query;
};

export const wallhaven = async (msg) => {
  let query = msg.text.split(" ").slice(1);
  let payload = queryFilter(query);
  let isPageFound = query.find((e) => e.includes("page"));
  var newQuery = qs
    .stringify(payload)
    .split("&")
    .filter((e) => !e.includes("page"));
  let data = await axios.get(
    `https://wallhaven.cc/api/v1/search?${qs.stringify(payload)}`
  );
  let page = (isPageFound && Number(isPageFound.split(":")[1])) || 1;

  bot.sendMessage(msg.chat.id, `Wallhaven page ${page}`, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [
          `/wall page:${page ? Number(page) + 1 : 2} ${newQuery
            .map((e) => e.replace("=", ":payload"))
            .join(" ")}`,
        ],
        ["/home"],
      ],
    },
  });
  sendImageInQueue({
    page,
    id: msg.chat.id,
    data: data.data.data,
    length: data.data.data.length,
    index: 0,
  });
};

const sendImageInQueue = async ({ page, id, data, length, index }) => {
  if (index > length) {
    return 0;
  } else {
    try {
      await bot.sendPhoto(id, data[index].thumbs.original, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Download`,
                url: data[index].path,
              },
            ],
          ],
        },
      });
      return sendImageInQueue({ page, id, data, length, index: ++index });
    } catch (error) {
      return sendImageInQueue({ page, id, data, length, index: ++index });
    }
  }
};

export const wallhavenCallback = async () => {};
