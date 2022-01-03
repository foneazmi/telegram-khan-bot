import { bot } from "../../app";
import { fcm } from "../../services";
export const firebase = (msg) => {
  const payload = {
    token:
      "cgewbQiYS_6ltPZ5uCYlwz:APA91bGk_6oVkkcRhWtcT70MCl3i7SlvT31L7JNSQ0GM3AvM-UNX2s1HdP7zLMS-3p1Kz2HckTltsbvnqekt0jHtiqIl5W5lDKmIy8hIiuWZRhmz7ROok4C8BGZN0eU_9M4u3jhEmpN6",
    message: {
      notification: {
        title: "FCM Message",
        body: "This is an FCM Message",
      },
      data: {
        url: "https://example.com/page1",
        type: "message",
      },
    },
    options: {
      priority: "high",
    },
  };
  fcm(payload)
    .then((response) => {
      bot.sendMessage(msg.chat.id, `"success" ${JSON.stringify(response)}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
