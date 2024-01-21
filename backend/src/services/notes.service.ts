import { searchNote } from "@controllers/notes/notes.controller";
import Notes, { INotes } from "@models/notes.model";
import mongoose from "mongoose";
import { BaseError, HttpStatusCode } from "./error.service";
import NotesShare from "@models/notesShare.model";

export const findAllNotes = async (query: {
  user: mongoose.Types.ObjectId | undefined;
}) => {
  const notes = await Notes.find(query);
  return notes;
};
export const findANoteById = async (id: string, dataFields: string[] = []) => {
  const note = await Notes.findById(id).select(dataFields);
  return note;
};

export const findSharedNotesByUser = async (
  userId: mongoose.Types.ObjectId | undefined,
  dataFields: string[] = []
) => {
  const sharedNotes = await NotesShare.find({
    sharedWith: userId,
  })
    .select(dataFields)
    .populate("note");
  return sharedNotes;
};

export const findASharedNoteByUserAndNoteId = async (
  sharedWith: mongoose.Types.ObjectId,
  note: mongoose.Types.ObjectId
) => {
  const data = await NotesShare.findOne({
    sharedWith,
    note,
  });
  return data;
};

export const searchNotes = async (
  query: any,
  page: number = 1,
  limit: number = 10
) => {
  const notes = await Notes.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  return notes;
};

export const createANote = async (
  createNoteInput: Omit<INotes, "user">,
  userId: mongoose.Types.ObjectId | undefined
) => {
  const note = await Notes.create({
    ...createNoteInput,
    user: userId,
  });
  return note;
};

export const createASharedNote = async (
  sharedWith: mongoose.Types.ObjectId,
  note: mongoose.Types.ObjectId
) => {
  await NotesShare.create({
    sharedWith,
    note,
  });
};

export const findUserAndUpdate = async (
  where: any,
  query: any,
  isNew: boolean = false
) => {
  return await Notes.findOneAndUpdate(where, query, { new: isNew });
};

export const deleteANote = async (id: string) => {
  const note = await findANoteById(id);
  if (!note) {
    throw new BaseError(
      HttpStatusCode.NOT_FOUND,
      "NOT_FOUND",
      "Note Not found"
    );
  }
  await Notes.deleteOne({ _id: id });
};
