import User from "@models/user.model";
import { BaseError, HttpStatusCode, catchAsync } from "@services/error.service";
import { IUserData } from "@validators/types.validator";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestWithUser extends Request {
  user?: IUserData;
}

export const authGuard = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new BaseError(
        HttpStatusCode.UNAUTHORIZED,
        "UNAUTHORIZED",
        "Please login to continue"
      );
    }
    const privateKey = "MY_SECRETE_KEY";
    const decoded = jwt.verify(token, privateKey);
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      // Now TypeScript knows `id` is a property on `decoded`
      const id = decoded.id;
      const user = await User.findById(id);
      if (!user) {
        return next(
          new BaseError(
            HttpStatusCode.BAD_REQUEST,
            "BAD_REQUEST",
            "Invalid Auth token"
          )
        );
      }

      req.user = user._id;
      //   console.log("here", req.user);
    } else {
      return next(
        new BaseError(
          HttpStatusCode.BAD_REQUEST,
          "BAD_REQUEST",
          "Invalid Auth token"
        )
      );
    }

    next();
  }
);
