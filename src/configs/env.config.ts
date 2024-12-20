import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 4500,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/system_bus",
  SALT: process.env.SALT || 10,
  JWT_SECRET: process.env.JWT_SECRET || "secret",

  // vnpay
  vnp_TmnCode: process.env.VNP_TMNCODE || "",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "",
  vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
  vnp_ReturnUrl: `http://localhost:4500/api/payment/vnpay_return`,
};
