import { Request, Response, NextFunction } from "express";

import _User from "../models/user.model";
import _Payment from "../models/payment.model";

import PaymentService from "../services/payment.service";
import { VnpParams } from "../utils/VnpParams.interface";

class PaymentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = PaymentService.getAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { bankCode, amount } = req.body;
      const paymentUrl = await PaymentService.createPayment(
        amount,
        req.ip as string
      );

      res.json({
        status: "success",
        message: "Created payment url",
        data: paymentUrl,
      });
    } catch (error) {
      next(error);
    }
  }

  async vnpayReturn(req: Request, res: Response, next: NextFunction) {
    const vnp_Params = req.query as VnpParams;
    const result = await PaymentService.vnpayReturn(vnp_Params);
    if (result) {
      res.json({
        status: "success",
        message: "Payment verified",
        data: vnp_Params,
      });
    } else {
      res.json({
        status: "failure",
        message: "Invalid signature",
        data: vnp_Params,
      });
    }
  }
}

export default new PaymentController();
