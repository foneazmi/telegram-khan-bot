import { bot } from "../../app";
import { hiperdex as hd } from "../../services";
import fs from "fs";

const hiperdexRemove = "https://hiperdex.com/manga/";
export const hiperdex = async (msg) => {
  let data = msg.text.split(" ");
  let pages = data[1] ?? 1;
  let response = await hd.latest(pages);
  let pagination = ["/hd 2"];
  if (pages > 1) {
    pagination = [`/hd ${parseInt(pages) - 1}`, `/hd ${parseInt(pages) + 1}`];
  }
  bot.sendMessage(msg.chat.id, `Page ${pages}`, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [pagination, ["/home"]],
    },
  });
  response.list.map((e, index) => {
    let chapter = e.chapters.map((f) => ({
      text: `${f.c_title}`,
      callback_data: `hd chapter ${f.c_url.replace(hiperdexRemove, "")}`,
    }));
    bot.sendPhoto(msg.chat.id, e.image, {
      reply_markup: {
        // resize_keyboard: true,
        inline_keyboard: [
          chapter,
          [
            {
              text: `${e.title}`,
              callback_data: `hd manga ${e.url.replace(hiperdexRemove, "")}`,
            },
          ],
        ],
      },
    });
  });
};

export const hiperdexCallback = async (msg) => {
  let callbackData = msg.text.split(" ");
  switch (callbackData[1]) {
    case "chapter":
      return hiperdexChapter(callbackData[2], msg);
    case "manga":
      return hiperdexChapter(callbackData[2], msg);
    default:
      console.log("ded");
  }
};

const hiperdexChapter = async (data, msg) => {
  let datas = data.split("/");
  let result = await hd.chapter(datas[0], datas[1]);
  let length = result.chapters.length;
  console.log("length", length);

  sendImageInQueue({
    id: msg.chat.id,
    data: result.chapters,
    length,
    page: 0,
  });
};

const sendImageInQueue = async ({ id, data, length, page }) => {
  if (page > length) {
    return 0;
  } else {
    await bot.sendPhoto(id, data[page].ch, {
      caption: `page ${page + 1}`,
    });
    return sendImageInQueue({ id, data, length, page: ++page });
  }
};

// //Todo
// const hiperdexManga= async()=>{
//     // hd.chapter()
//   }
