import { Router } from "express";
import PaymentController from "../controllers/payment.controler";

const router = Router();

// router.post("/generate_qrcode", generateQR);
router.post("/create_payment", PaymentController.createPayment);
router.get("/vnpay_return", PaymentController.vnpayReturn);
router.get("/", PaymentController.getAll);

export default router;
