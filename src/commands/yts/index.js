import axios from "axios";
import { bot } from "../../app";
import qs from "qs";

const queryFilter = (rawQuery) => {
  let query = {};
  rawQuery.text
    .split(" ")
    .slice(1)
    .map((e) => {
      let each = e.split(":");
      if (each[0] === "limit") {
        query = { ...query, limit: each[1] };
      } else if (each[0] === "page") {
        query = { ...query, page: each[1] };
      } else if (each[0] === "quality") {
        query = { ...query, quality: each[1] };
      } else if (each[0] === "minimum_rating") {
        query = { ...query, minimum_rating: each[1] };
      } else if (each[0] === "q") {
        query = { ...query, query_term: each[1] };
      } else if (each[0] === "genre") {
        query = { ...query, genre: each[1] };
      } else if (each[0] === "sort_by") {
        query = { ...query, sort_by: each[1] };
      } else if (each[0] === "order_by") {
        query = { ...query, order_by: each[1] };
      } else if (each[0] === "with_rt_ratings") {
        query = { ...query, with_rt_ratings: each[1] };
      }
    });
  return query;
};

export const commandYts = (msg) => {
  let payload = queryFilter(msg);
  axios
    .get(`https://yts.mx/api/v2/list_movies.json?${qs.stringify(payload)}`)
    .then((e) => {
      console.log(e.data.data.movies);
      e.data.data.movies.forEach((f) => {
        bot.sendPhoto(msg.chat.id, f.large_cover_image);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
