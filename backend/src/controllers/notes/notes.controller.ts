import Notes from "@models/notes.model";
import User from "@models/user.model";
import { BaseError, HttpStatusCode, catchAsync } from "@services/error.service";
import {
  createNotesInput,
  updateNotesInput,
} from "@validators/input.validators";
import { IUserData } from "@validators/types.validator";
import { NextFunction, Request, Response } from "express";
interface RequestWithUser extends Request {
  user?: IUserData;
}
export const getNotes = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const notes = await Notes.find({ user: req.user?._id });
    res.status(HttpStatusCode.OK).json({ total: notes.length, notes });
  }
);

export const getNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const note = await Notes.findById(id);
    res.status(HttpStatusCode.OK).json({ note });
  }
);

export const createNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const parsedBody = createNotesInput.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BaseError(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "Invalid Input",
        "Not valid input"
      );
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user?._id },
      { $inc: { noteCount: 1 } },
      { new: true }
    );

    const note = await Notes.create({
      ...parsedBody.data,
      user,
    });

    // Excluding User Data in the Response
    const { user: userData, ...noteWithoutUser } = note.toObject();
    // console.log("here", noteWithoutUser);

    // Returning Only User Email in the Response
    // const { user: {_id: userId}, ...rest } = note.toObject();

    res
      .status(HttpStatusCode.CREATED)
      .json({ message: "successful", note: noteWithoutUser });
  }
);

export const UpdateNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const parsedBody = updateNotesInput.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BaseError(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "Invalid Input",
        "Not valid input"
      );
    }
    const { id } = req.params;

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id },
      { ...parsedBody.data },
      { new: true }
    );

    if (!updatedNote) {
      throw new BaseError(
        HttpStatusCode.NOT_FOUND,
        "NOT_FOUND",
        "Note Not found"
      );
    }

    res.status(HttpStatusCode.OK).json({ note: updatedNote });
  }
);

export const deleteNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const note = await Notes.findById(id);
    if (!note) {
      throw new BaseError(
        HttpStatusCode.NOT_FOUND,
        "NOT_FOUND",
        "Note Not found"
      );
    }

    await Notes.deleteOne({ _id: id });

    res
      .status(HttpStatusCode.OK)
      .json({ message: "message deleted successfully" });
  }
);
