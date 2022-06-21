import * as cheerio from "cheerio";

// const cheerio = require("cheerio");
// const axios = require("axios");
import axios from "axios";

const info = async (slug) => {
  try {
    const genres = [];
    const res = await axios.get(`https://hiperdex.com/manga/${slug}`);
    const $ = cheerio.load(res.data);
    const manhwa_title = $(".post-title > h1:nth-child(1)").text().trim();
    const poster = $(".summary_image img").attr("src");
    const author = $(".author-content a").text().trim();
    const artist = $(".artist-content a").text().trim();
    const genres_e = $(".genres-content a");
    $(genres_e).each((i, e) => genres.push($(e).text().trim()));
    const other_name = $(
      "div.post-content_item:nth-child(5) > div:nth-child(2)"
    )
      .text()
      .trim();
    const status = $("div.post-content_item:nth-child(2) > div:nth-child(2)")
      .text()
      .trim();
    const description = $(".description-summary").text().trim();
    const ch_list = await chaptersList(
      `https://hiperdex.com/manga/${slug}/ajax/chapters/`
    );
    return {
      page: manhwa_title,
      other_name: other_name,
      poster: poster,
      authors: author,
      artists: artist,
      genres: genres,
      status: status,
      description: description,
      ch_list,
    };
  } catch (error) {
    return { error: "Sorry dude, an error occurred! No Info!" };
  }
};

const chaptersList = async (url) => {
  try {
    const ch_list = [];
    const res = await axios.post(url);
    const $ = cheerio.load(res.data);
    $(".wp-manga-chapter").each((_, element) => {
      const elements = $(element);
      const title = elements.find("a").text().trim();
      const url = elements.find("a").attr("href");
      const time = elements.find(".chapter-release-date").find("i").text();
      const status = elements
        .find(".chapter-release-date")
        .find("a")
        .attr("title");
      ch_list.push({ title, time, status, url });
    });
    return ch_list;
  } catch (error) {
    return { error: "Error Getting Chapters!" };
  }
};

const latest = async (page) => {
  let m_list = [];
  try {
    res = await axios.get(`https://hiperdex.com/page/${page}`);
    const body = await res.data;
    const $ = cheerio.load(body);
    let p_title = $(".c-blog__heading h1").text().trim();
    $("#loop-content .page-listing-item .page-item-detail").each(
      (_, element) => {
        $elements = $(element);
        url = $elements.find("a").attr("href");
        image = $elements.find("img").attr("src");
        title = $elements
          .find(".page-item-detail .post-title")
          .find("h3")
          .text()
          .trim();
        rating = $elements.find(".total_votes").text().trim();
        chapter = $elements.find(".list-chapter .chapter-item");
        let chapters = [];
        $(chapter).each((i, e) => {
          let c_title = $(e).find("a").text().trim();
          let c_url = $(e).find("a").attr("href");
          let c_date = $(e).find(".post-on").text().trim();
          let status = $(e).find(".post-on a").attr("title");
          chapters.push({
            c_title: c_title,
            c_url: c_url,
            c_date: c_date,
            status: status,
          });
        });

        m_list.push({
          title: title,
          rating: rating,
          image: image,
          url: url,
          chapters: chapters,
        });
      }
    );

    let current = $(".current").text();
    let last_page = $(".last").attr("href");
    !last_page ? (last_page = current) : last_page;

    return {
      p_title: p_title,
      list: m_list,
      current_page: parseInt(current),
      last_page: parseInt(last_page.replace(/[^0-9]/g, "")),
    };
  } catch (error) {
    return { error: "Sorry dude, an error occurred! No Latest!" };
  }
};

const chapter = async (manga, chapter) => {
  let ch_list = [];

  try {
    res = await axios.get(`https://hiperdex.com/manga/${manga}/${chapter}`);
    const body = await res.data;
    const $ = cheerio.load(body);

    $(".read-container img").each((index, element) => {
      $elements = $(element);
      image = $elements.attr("src").trim();

      ch_list.push({ ch: image });
    });

    let manga_title = $("#chapter-heading").text().trim();
    let manga_url = $(".breadcrumb > li:nth-child(2) > a:nth-child(1)").attr(
      "href"
    );

    let current_ch = $(".active").text().trim();

    let prev = $(".prev_page").attr("href");
    let next = $(".next_page").attr("href");

    return {
      manga: manga_title,
      manga_url: manga_url,
      current_ch: current_ch,
      chapters: ch_list,
      nav: [
        {
          prev: prev,
          next: next,
        },
      ],
    };
  } catch (error) {
    return { error: "Sorry dude, an error occurred! No Chapter Images!" };
  }
};

export const hiperdex = {
  info,
  chapter,
  latest,
  chaptersList,
};
