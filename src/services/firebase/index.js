import admin from "firebase-admin";
import serviceAccount from "../../../khan-53dce-firebase-adminsdk-rk0ul-3518274405.json"

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://khan-53dce-default-rtdb.firebaseio.com",
});

// export const setLogState = async (msg) => {
//   // const token = process.env.TELEGRAM_TOKEN;
//   // let identifier = token.substr(0, 5);
//   const ref = firebaseApp
//     .firestore()
//     .collection(`chat-id`)
//     .doc(`${msg.chat.id}`);
//   let data = {};
//   if (msg.text === "Next" || msg.text === "Back") {
//     let log = await getLogState(msg.chat.id);
//     let page =
//       msg.text === "Next"
//         ? Number(log.data().page) + 1
//         : Number(log.data().page) - 1;
//     data = {
//       text: msg.text,
//       page: page > 0 ? page : 1,
//     };
//     ref.set(data);
//   } else {
//     let query = msg.text.split(" ");
//     let isCommand = query[0].includes("/");
//     let isPageFound = query.find((e) => e.includes("page"));
//     var newQuery = query.slice(1).filter((e) => !e.includes("page"));
//     let each = isPageFound && isPageFound.split(":");
//     data = isCommand
//       ? {
//           command: query[0],
//           page: isPageFound ? Number(each[1]) : 1,
//           payload: newQuery.join(" "),
//           text: msg.text,
//         }
//       : {
//           text: msg.text,
//         };
//     ref.set(data);
//   }
// };

// export const getLogState = async (id) => {
//   // const token = process.env.TELEGRAM_TOKEN;
//   // let identifier = token.substr(0, 5);
//   let log = await firebaseApp
//     .firestore()
//     .collection(`chat-id`)
//     .doc(`${id}`)
//     .get();
//   return log;
// };

export const fcm = ({ token, message, options }) => {
  return firebaseApp.messaging().sendToDevice(token, message, options);
};
