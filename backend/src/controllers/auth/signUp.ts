import User from "@models/userModel";
import { signUpInput } from "@validators/input.validators";
import { NextFunction, Request, Response } from "express";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBody = signUpInput.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: parsedBody.error });
    return;
  }
  // const userName = parsedBody.body;
  try {
    const data = await User.create(parsedBody.data);
  } catch (err) {
    res.status(400).json({ error: err });
    return;
  }
  // console.log(err);

  res.json({ message: parsedBody.data });
};

export default signUp;
