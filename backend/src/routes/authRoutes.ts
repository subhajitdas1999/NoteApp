import signUp from "controllers/auth/signUp";
import express from "express";

const authRouter = express.Router();
authRouter.post("/signup", signUp);

export default authRouter;
