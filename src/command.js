import { getFirstWord } from "./helpers";
import {
  start,
  chatId,
  hiperdex,
  hiperdexCallback,
  wallCommandList,
} from "./commands";

const commandList = {
  "/start": start,
  "/home": start,
  "/id": chatId,
  "/hd": hiperdex,
  hd: hiperdexCallback, ///
  ...wallCommandList,
};

export const command = (msg) => {
  const run = commandList[getFirstWord(msg.text)] || (() => {});
  run(msg);
};
