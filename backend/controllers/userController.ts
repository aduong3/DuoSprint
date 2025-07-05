import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;

    const newUser = await User.create(data);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    let msg;
    if (err instanceof Error) {
      msg = err.message;
    } else {
      msg = err;
    }
    res.status(400).json({
      status: "failed",
      message: msg,
    });
  }
}
