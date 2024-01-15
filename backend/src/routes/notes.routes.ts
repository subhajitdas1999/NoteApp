import {
  UpdateNote,
  createNote,
  deleteNote,
  getNote,
  getNotes,
  searchNote,
  shareNote,
} from "@controllers/notes/notes.controller";
import { authGuard } from "@middlewares/auth.middleware";
import express from "express";

const notesRouter = express.Router();
notesRouter.get("/", authGuard, getNotes);
notesRouter.get("/search", authGuard, searchNote);
notesRouter.get("/:id", authGuard, getNote);
notesRouter.post("", authGuard, createNote);
notesRouter.post("/:id/share", authGuard, shareNote);
notesRouter.put("/:id", authGuard, UpdateNote);
notesRouter.delete("/:id", authGuard, deleteNote);

export default notesRouter;
