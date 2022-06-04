import express from "express";
// import { validateSignIn, validateSignUp } from "../middleware/validate-auth";
import authRouter from "../controllers/user";

const router = express.Router();

router.post("/signup", authRouter.signup);

router.post("/login", authRouter.login);

export default router;
