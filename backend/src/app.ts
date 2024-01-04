import express from "express";
import authRouter from "routes/authRoutes";

const app = express();

app.use("/api/auth", authRouter);
export default app;
