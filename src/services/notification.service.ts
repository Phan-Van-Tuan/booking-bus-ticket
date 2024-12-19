import { Message } from "firebase-admin/lib/messaging/messaging-api";
import { firebaseMessaging } from "../config/firebase.config";

class NotificationService {
  /**
   * Gửi thông báo đến thiết bị Android qua FCM
   * @param {string} token - FCM Token của thiết bị Android
   * @param {string} title - Tiêu đề thông báo
   * @param {string} body - Nội dung thông báo
   * @param {object} data - Dữ liệu tùy chỉnh (optional)
   */
  async sendNotification(
    token: string,
    title: string,
    body: string,
    data?: object
  ) {
    const message = {
      token,
      notification: {
        title,
        body,
      },
      data: data || {}, // Thêm dữ liệu tùy chỉnh
    } as Message;

    try {
      const response = await firebaseMessaging.send(message);
      console.log("Successfully sent notification:", response);
      return response;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw new Error("Failed to send notification");
    }
  }
}

export default new NotificationService();
