import { getFirstWord } from "./helpers";
import {
  start,
  wallhaven,
  chatId,
  hiperdex,
  hiperdexCallback,
  WallSendHere,
} from "./commands";

const commandList = {
  "/start": start,
  "/home": start,
  "/wall": wallhaven,
  "/id": chatId,
  "/hd": hiperdex,
  //
  wall: WallSendHere,
  hd: hiperdexCallback,
};

export const command = (msg) => {
  const run = commandList[getFirstWord(msg.text)] || (() => {});
  run(msg);
};
