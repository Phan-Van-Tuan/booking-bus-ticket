import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const firebaseConfigPath = path.resolve(
  __dirname,
  "../../firebase-service-account.json"
);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfigPath), // File JSON từ Firebase
});

export const firebaseMessaging = admin.messaging();
