import User from "@models/userModel";
import { BaseError, HttpStatusCode, catchAsync } from "@services/error.service";
import { logInInput, signUpInput } from "@validators/input.validators";
import { IUserData } from "@validators/types.validator";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
interface RequestWithUser extends Request {
  user?: IUserData;
}

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = signUpInput.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BaseError(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "Invalid Input",
        "Not valid input"
      );
    }

    const user = await User.create(parsedBody.data);

    res.status(HttpStatusCode.CREATED).json({
      message: "Signup successful",
      email: user.email,
      token: getJwtToken(user._id.toString()),
    });
  }
);

export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = logInInput.safeParse(req.body);
    if (!parsedBody.success) {
      throw new BaseError(
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        "Invalid Input",
        "Please provide email and password"
      );
    }
    const user = await User.findOne({ email: parsedBody.data.email }).select(
      "+password"
    );

    if (!user || !(await user.checkPassword(parsedBody.data.password))) {
      throw new BaseError(
        HttpStatusCode.NOT_FOUND,
        "Not found",
        "Invalid email or password"
      );
    }

    res.json({
      message: "login successful",
      email: user.email,
      token: getJwtToken(user._id.toString()),
    });
  }
);

const getJwtToken = (id: string): string => {
  const privateKey = "MY_SECRETE_KEY";
  return jwt.sign({ id }, privateKey, {
    expiresIn: 60 * 60,
  }); //1hr
};

export const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      message: "logoOut successful",
      token: "",
    });
  }
);
export const test = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    res.json({ ok: "ok" });
  }
);
