import mongoose from "mongoose";

interface INotes {
  title: string;
  description: string;
  createdAt: Date;
}

const notesSchema = new mongoose.Schema<INotes>({
  title: { type: String },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Notes = mongoose.model<INotes>("Notes", notesSchema);
export default Notes;
