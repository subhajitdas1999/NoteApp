import mongoose from "mongoose";
import { IUser } from "./user.model";
import { INotes } from "./notes.model";
import { boolean } from "zod";

interface INotesShare {
  sharedWith: IUser;
  note: INotes;
  readonly: boolean;
}

const notesShareSchema = new mongoose.Schema<INotesShare>(
  {
    sharedWith: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    note: { type: mongoose.Types.ObjectId, ref: "Notes", required: true },
    readonly: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const NotesShare = mongoose.model<INotesShare>("NotesShare", notesShareSchema);
export default NotesShare;
