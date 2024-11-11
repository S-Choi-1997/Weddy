// src/fcm.ts
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});



export const sendPushNotification = async (
  token: string,
  title: string,
  body: string
) => {
  console.log("Token:", token);
  console.log("Title:", title);
  console.log("Body:", body);

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
