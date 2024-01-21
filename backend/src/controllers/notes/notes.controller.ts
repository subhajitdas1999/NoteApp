import { BaseError, HttpStatusCode, catchAsync } from "@services/error.service";
import {
  createANote,
  createASharedNote,
  deleteANote,
  findANoteById,
  findASharedNoteByUserAndNoteId,
  findAllNotes,
  findSharedNotesByUser,
  searchNotes,
} from "@services/notes.service";
import { findUserAndUpdate, findUserByEmail } from "@services/user.service";
import {
  createNotesInput,
  searchNoteQuery,
  shareNoteInput,
  updateNotesInput,
} from "@validators/input.validators";
import { IUserData } from "@validators/types.validator";
import { NextFunction, Request, Response } from "express";
interface RequestWithUser extends Request {
  user?: IUserData;
}
export const getNotes = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const notes = await findAllNotes({ user: req.user?._id });
    const sharedNotes = await findSharedNotesByUser(req.user?._id, [
      "note",
      "readonly",
    ]);
    res.status(HttpStatusCode.OK).json({
      total: notes.length,
      notes,
      sharedNotesLength: sharedNotes.length,
      sharedNotes,
    });
  }
);

export const getNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const note = await findANoteById(id);
    res.status(HttpStatusCode.OK).json({ note });
  }
);

export const searchNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const parsedQuery = searchNoteQuery.safeParse(req.query);
    if (!parsedQuery.success) {
      throw new BaseError(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "Invalid Input",
        "Not valid input"
      );
    }
    let { searchText, page, limit } = parsedQuery.data;
    const query = {
      user: req.user?._id,
      $text: { $search: searchText },
    };
    const notes = await searchNotes(query, page, limit);

    res.status(HttpStatusCode.OK).json({ total: notes.length, notes });
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
    const user = await findUserAndUpdate(
      { _id: req.user?._id },
      { $inc: { noteCount: 1 } },
      true
    );

    const note = await createANote(parsedBody.data, user?._id);

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

    const updatedNote = await findUserAndUpdate(
      { _id: id },
      { ...parsedBody.data },
      true
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

    await deleteANote(id);

    res
      .status(HttpStatusCode.OK)
      .json({ message: "message deleted successfully" });
  }
);

export const shareNote = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const parsedBody = shareNoteInput.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BaseError(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "Invalid Input",
        "Not valid input"
      );
    }
    const { id } = req.params;
    const shareNote = await findANoteById(id, ["_id", "user", "title"]);
    if (!shareNote) {
      throw new BaseError(
        HttpStatusCode.NOT_FOUND,
        "NOT_FOUND",
        "Notes Not found"
      );
    }

    if (!shareNote.user._id.equals(req.user?._id)) {
      throw new BaseError(
        HttpStatusCode.NOT_ACCEPTABLE,
        "NOT_ACCEPTABLE",
        "Can only share own notes"
      );
    }
    const shareWith = await findUserByEmail(parsedBody.data.email, ["_id"]);
    // const shareWith = await User.findOne({
    //   email: parsedBody.data.email,
    // }).select("_id");

    if (!shareWith) {
      throw new BaseError(
        HttpStatusCode.NOT_FOUND,
        "NOT_FOUND",
        "User Not found, check email"
      );
    }

    if (shareWith._id.equals(req.user?._id)) {
      throw new BaseError(
        HttpStatusCode.NOT_ACCEPTABLE,
        "NOT_ACCEPTABLE",
        "Can Not share own Notes"
      );
    }

    const ifDataExists = await findASharedNoteByUserAndNoteId(
      shareWith._id,
      shareNote._id
    );
    if (ifDataExists) {
      throw new BaseError(HttpStatusCode.FOUND, "FOUND", "Already shared");
    }

    await createASharedNote(shareWith._id, shareNote._id);
    res.status(HttpStatusCode.OK).json({
      message: `Notes with title **${shareNote.title}** shared with ${parsedBody.data.email}`,
    });
  }
);
