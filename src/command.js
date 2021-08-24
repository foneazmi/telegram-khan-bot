import { getFirstWord } from "./helpers";
import {
  commandStart,
  commandWallhaven,
  commandYoutube,
  commandYts,
  commandKhan,
} from "./commands";

const commandList = {
  "/start": commandStart,
  "/wall": commandWallhaven,
  "/yt": commandYoutube,
  "/yts": commandYts,
  "/khan": commandKhan,
};

export const command = (msg) => {
  const commandRun = commandList[getFirstWord(msg.text)];
  commandRun && commandRun(msg);
};
