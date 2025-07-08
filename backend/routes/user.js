import express from "express";
const router = express.Router();
import { deleteData, getDeleted } from "../controller/user.js";
import { auth } from "../middleware/auth.js";

router.post("/user/delete", deleteData);
router.get("/user/delete", auth, getDeleted);

export default router;
