import _Payment from "../models/payment.model";
import crypto from "crypto";
import { URLSearchParams } from "url";
import { config } from "../config/env";
import { VnpParams } from "../utils/VnpParams.interface";

class PaymentService {
  async getAll() {
    try {
      let data = await _Payment.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createPayment(amount: number, ip: string) {
    try {
      const orderId = `${Date.now()}`;
      const vnp_Params: VnpParams = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: config.vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
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
        // let newPayment = new _Payment(
        //   vnp_Params.vnp_TxnRef,
        //   1,
        //   vnp_Params.vnp_Amount,
        //   vnp_Params.vnp_BankCode
        // );
        // await newPayment.save();
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentService();
