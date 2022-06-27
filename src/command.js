import { getFirstWord } from "./helpers";
import {
  start,
  wallhaven,
  chatId,
  // firebase,
  stock,
  hiperdex,hiperdexCallback,
} from "./commands";
// import { getLogState, setLogState } from "./services";
const commandList = {
  "/start": start,
  "/home": start,
  "/wall": wallhaven,
  "/id": chatId,
  // "/fb": firebase,
  "/hd": hiperdex,
  $: stock,
};

export const command = (msg) => {
  const run = commandList[getFirstWord(msg.text)] || (()=>{});
  run(msg);
};

const callbackList = {
  "hd": hiperdexCallback,
};

export const callback = (msg) => {
  const run = callbackList[getFirstWord(msg.text)] || (()=>{});
  run(msg);
};
