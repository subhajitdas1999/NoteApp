import Notes from "@models/notes.model";
import User from "@models/user.model";
import { BaseError, HttpStatusCode, catchAsync } from "@services/error.service";
import { createNotesInput } from "@validators/input.validators";
import { IUserData } from "@validators/types.validator";
import { NextFunction, Request, Response } from "express";
interface RequestWithUser extends Request {
  user?: IUserData;
}
export const getNotes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getNote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
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
      { $inc: { noteCount: 1 } }
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
  async (req: RequestWithUser, res: Response, next: NextFunction) => {}
);

export const deleteNote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
