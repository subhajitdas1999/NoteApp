import { NextFunction, Request, Response } from "express";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const userData = { ...req.body };
  res.json({ message: "ok" });
};

export default signUp;
