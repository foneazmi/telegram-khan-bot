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

const wallhaven = async (msg) => {
  let query = msg.text.split(" ").slice(1);
  let payload = queryFilter(query);
  let isPageFound = query.find((e) => e.includes("page"));
  let page = (isPageFound && Number(isPageFound.split(":")[1])) || 1;
  let newQuery = query.filter((e) => !e.includes("page"));
  query = qs.stringify(payload);
  let data = await axios.get(`https://wallhaven.cc/api/v1/search?${query}`);
  let index = 0;
  const sendImageInQueue = async ({ data }) => {
    if (index > data.length) {
      bot.sendMessage(msg.chat.id, `Wallhaven page ${page}`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Back`,
                callback_data: `/start`,
              },
              {
                text: `Next`,
                callback_data: `/wall page:${page + 1} ${
                  newQuery && newQuery?.join(" ")
                }`,
              },
            ],
          ],
        },
      });
    } else {
      try {
        await bot.sendPhoto(msg.chat.id, data[index].thumbs.original, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: `Open`,
                  url: data[index].path,
                },
                {
                  text: `Send`,
                  callback_data: `#wallSendOri ${data[index].path}`,
                },
              ],
            ],
          },
        });
        index++;
        return sendImageInQueue({ data });
      } catch (error) {
        console.log("error", error);
        index++;
        return sendImageInQueue({ data });
      }
    }
  };

  sendImageInQueue({
    data: data.data.data,
  });
};

const WallSendOri = async (msg) => {
  let query = msg.text.split(" ").slice(1);
  console.log("query", query);
  await bot.sendPhoto(msg.chat.id, query[0], {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Open`,
            url: query[0],
          },
        ],
      ],
    },
  });
};

export const wallCommandList = {
  wall: () => {
    console.log("wall");
  },
  "/wall": wallhaven,
  "#wallSendOri": WallSendOri,
};
