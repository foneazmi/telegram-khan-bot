import { bot } from "../../app";
import fs from "fs";
import ytdl from "ytdl-core";

export const youtube = (msg) => {
  let query = msg.text.split(" ").slice(1);
  let title = msg.chat.id;
  const writeableStream = fs.createWriteStream(
    `src/commands/youtube/${title}.mp4`
  );

  // Listening for the 'finish' event
  writeableStream.on("finish", () => {
    bot.sendVideo(msg.chat.id, `src/commands/youtube/${title}.mp4`);
  });

  // Plug it into the ReadableStream
  ytdl(query[0], {
    format: "mp4",
  }).pipe(writeableStream);
};
