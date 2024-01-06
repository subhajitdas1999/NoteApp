import authRouter from "@routes/authRoutes";
import { globalErrorHandler } from "@services/error.service";
import express from "express";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);
export default app;
