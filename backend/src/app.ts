import authRouter from "@routes/auth.routes";
import notesRouter from "@routes/notes.routes";
import { globalErrorHandler } from "@services/error.service";
import express from "express";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.use(globalErrorHandler);
export default app;
