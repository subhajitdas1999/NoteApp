import { catchAsync } from "@services/error.service";
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
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const UpdateNote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteNote = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
