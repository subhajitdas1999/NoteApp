import { logIn, logOut, signUp, test } from "@controllers/auth/auth.controller";
import { authGuard } from "@middlewares/auth.middleware";
import express from "express";

const authRouter = express.Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.post("/logout", authGuard, logOut);

authRouter.post("/test", authGuard, test);

export default authRouter;
