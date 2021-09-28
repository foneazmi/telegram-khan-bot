import { getFirstWord } from "./helpers";
import { start, wallhaven, chatId, youtube, firebase } from "./commands";
import { getLogState, setLogState } from "./services";
const commandList = {
  "/start": start,
  "/home": start,
  "/wall": wallhaven,
  "/id": chatId,
  "/yt": youtube,
  "/fb": firebase,
};

export const command = async (msg) => {
  setLogState(msg);
  let log = await getLogState(msg.chat.id);
  if (getFirstWord(msg.text) === "Next" || getFirstWord(msg.text) === "Back") {
    let isNext = getFirstWord(msg.text) === "Next";
    let page = isNext ? log.data().page + 1 : log.data().page - 1;
    let command = log.data().command;
    let payload = `${command} page:${page > 0 ? page : 1} ${
      log.data().payload
    }`;
    console.log("command", payload);
    msg.text = payload;
  }

  const commandRun = commandList[getFirstWord(msg.text)];
  commandRun && commandRun(msg);
};
