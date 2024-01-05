import { NextFunction, Request, Response } from "express";

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  res.send({ ok: "ok" });
};

export default logIn;
