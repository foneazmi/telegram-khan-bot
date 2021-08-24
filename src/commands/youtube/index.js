import { bot } from "../../app";
import youtubedl from "youtube-dl-exec";

export const commandYoutube = (e) => {
  let link = e.text.split(" ").slice(1);
  youtubedl(link, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: link,
  }).then((output) => {
    let video = output.formats.find((e) => e.format_id === "22");
    bot.sendVideo(e.chat.id, "https://i.imgur.com/OKRRfmN.mp4");
    bot.sendMessage(e.chat.id, video.url);
  });
};
