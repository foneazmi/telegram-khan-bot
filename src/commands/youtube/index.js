import { bot } from "../../app";
import fs from "fs";
import ytdl from "ytdl-core";

export const youtube = (msg) => {
  let query = msg.text.split(" ").slice(1);
  if (query[0]) {
    let title = msg.chat.id;
    const writeableStream = fs.createWriteStream(
      `src/commands/youtube/${title}.mp4`
    );
    writeableStream.on("finish", () => {
      bot.sendVideo(msg.chat.id, `src/commands/youtube/${title}.mp4`, {
        reply_markup: {
          keyboard: [["/home"]],
        },
      });
    });
    ytdl(query[0], {
      format: "mp4",
    }).pipe(writeableStream);
  }
};
