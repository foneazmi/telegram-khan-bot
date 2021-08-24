import { getFirstWord } from "./helpers";
import { start, wallhaven, chatId } from "./commands";

const commandList = {
  "/chatId": chatId,
  "/start": start,
  "/wallhaven": wallhaven,
};

export const command = (msg) => {
  const commandRun = commandList[getFirstWord(msg.text)];
  commandRun && commandRun(msg);
};
