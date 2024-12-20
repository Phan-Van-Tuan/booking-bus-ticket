import _Payment from "../models/payment.model";
import crypto from "crypto";
import { URLSearchParams } from "url";
import { config } from "../configs/env.config";
import { VnpParams } from "../utils/VnpParams.interface";
import { confirmBooking } from "./booking.service";
import { info } from "console";

class PaymentService {
  async getAll() {
    try {
      let data = await _Payment.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createPayment(amount: number, ip: string, content: string) {
    try {
      const orderId = `${Date.now()}`;
      const vnp_Params: VnpParams = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: config.vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: content,
        vnp_OrderType: "other",
        vnp_Amount: `${amount * 100}`,
        vnp_ReturnUrl: config.vnp_ReturnUrl,
        vnp_IpAddr: ip || "",
        // vnp_BankCode: bankCode,
        vnp_CreateDate: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "")
          .replace(/-/g, "")
          .replace(/:/g, "")
          .replace(/ /g, ""),
      };
      const sortedParams: VnpParams = Object.keys(vnp_Params)
        .sort()
        .reduce((r: VnpParams, k: string) => {
          r[k] = vnp_Params[k];
          return r;
        }, {});

      const signData = new URLSearchParams(sortedParams).toString();
      const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      const paymentUrl = `${config.vnp_Url}?${new URLSearchParams(
        sortedParams
      ).toString()}&vnp_SecureHash=${signed}`;
      return paymentUrl;
    } catch (error) {
      throw error;
    }
  }

  async vnpayReturn(vnp_Params: VnpParams): Promise<boolean> {
    try {
      const secureHash = vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];
      const sortedParams: VnpParams = Object.keys(vnp_Params)
        .sort()
        .reduce((r: VnpParams, k: string) => {
          r[k] = vnp_Params[k];
          return r;
        }, {});
      const signData = new URLSearchParams(sortedParams).toString();
      const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      if (secureHash === signed) {
        const data = JSON.parse(vnp_Params.vnp_OrderInfo);
        let newPayment = new _Payment({
          tripId: data.tripId,
          userId: data.userId,
          amount: vnp_Params.vnp_Amount,
          method: "vnpay",
          status: "completed",
          info: vnp_Params,
        });
        await newPayment.save();

        confirmBooking(vnp_Params.vnp_OrderInfo);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentService();
