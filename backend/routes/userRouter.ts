import express from "express";
import { logIn, signUp } from "../controllers/userController";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(logIn);

export default router;
