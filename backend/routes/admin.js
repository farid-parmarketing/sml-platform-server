import express from "express";
const router = express.Router();
import { signup, login, getAdmin } from "../controller/admin.js";
import { auth } from "../middleware/auth.js";

router.post("/admin/signup", signup);
router.post("/admin/login", login);
router.get("/admin/auth", auth, getAdmin);

export default router;
