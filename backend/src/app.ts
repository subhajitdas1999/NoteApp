import authRouter from "@routes/authRoutes";
import express from "express";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
export default app;
