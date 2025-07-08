import express from "express";
const router = express.Router();
import { initiatePayment, confirmPayment } from "../controller/payment.js";

router.post("/initiatepayment", initiatePayment);
router.post("/confirmpayment", confirmPayment);

export default router;
