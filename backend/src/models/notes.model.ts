import mongoose from "mongoose";
import { IUser } from "./user.model";

interface INotes {
  title: string;
  description: string;
  user: IUser;
}

const notesSchema = new mongoose.Schema<INotes>(
  {
    title: { type: String },
    description: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Enable automatic timestamp management.Mongoose's built-in timestamps option. This option automatically adds createdAt and updatedAt fields to your schema and manages them for you.
  }
);

notesSchema.index({ title: "text", description: "text" });

const Notes = mongoose.model<INotes>("Notes", notesSchema);
export default Notes;
