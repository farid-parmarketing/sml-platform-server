import express from "express";
const router = express.Router();

import {
  generateToken,
  getToken,
  postProxy,
  putProxy,
  getProxy,
} from "../controller/zoho.js";
import cron from "node-cron";

cron.schedule("*/30 * * * *", () => {
  generateToken();
});

// GENERATE token
router.get("/token/generate", generateToken);

// GET token
router.get("/token", getToken);

// POST proxy
router.post("/proxy", postProxy);

// PUT proxy
router.put("/proxy", putProxy);

// GET proxy
router.get("/proxy", getProxy);

export default router;
