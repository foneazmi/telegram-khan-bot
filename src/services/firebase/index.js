import admin from "firebase-admin";
import serviceAccount from "../../../khan-53dce-firebase-adminsdk-rk0ul-3518274405.json";

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://khan-53dce-default-rtdb.firebaseio.com",
});

export const setLogState = async (msg) => {
  const ref = firebaseApp
    .firestore()
    .collection(`chat-id`)
    .doc(`${msg.chat.id}`);
  let data = {};
  if (msg.text === "Next" || msg.text === "Back") {
    let log = await getLogState(msg.chat.id);
    console.log("log firebase", log.data());
    let page =
      msg.text === "Next"
        ? Number(log.data().page) + 1
        : Number(log.data().page) - 1;
    data = {
      text: msg.text,
      page: page > 0 ? page : 1,
    };
    console.log(data);
    ref.update(data);
  } else {
    let query = msg.text.split(" ");
    let isCommand = query[0].includes("/");
    let isPageFound = query.find((e) => e.includes("page"));
    var newQuery = query.slice(1).filter((e) => !e.includes("page"));
    let each = isPageFound && isPageFound.split(":");
    data = isCommand
      ? {
          command: query[0],
          page: isPageFound ? Number(each[1]) : 1,
          payload: newQuery.join(" "),
          text: msg.text,
        }
      : {
          text: msg.text,
        };
    ref.update(data);
  }
};

export const getLogState = async (id) => {
  let log = await firebaseApp
    .firestore()
    .collection(`chat-id`)
    .doc(`${id}`)
    .get();
  return log;
};

// const mapArrayToObject = (array) => {
//   let object = {};
//   array.map((e) => {
//     let each = e.split(":");
//     object[each[0]] = each[1] || true;
//   });
//   return object;
// };
