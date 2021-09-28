import { getFirstWord } from "./helpers";
import { start, wallhaven, chatId, youtube } from "./commands";

const commandList = {
  "/id": chatId,
  "/start": start,
  "/wallhaven": wallhaven,
  "/wall": wallhaven,
  "/yt": youtube,
};

export const command = (msg) => {
  const commandRun = commandList[getFirstWord(msg.text)];
  commandRun && commandRun(msg);
};
