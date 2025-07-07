import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

// req.body needs to include the authProvider so that we know which route to take in signUp
export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      email,
      username,
      password,
      emailConfirm,
      passwordConfirm,
      authProvider,
    } = req.body;

    const newUser = await User.create({
      email,
      username,
      password,
      emailConfirm,
      passwordConfirm,
      authProvider,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err: any) {
    let msg = "";
    if (typeof err === "string") {
      msg = err;
    }

    if (typeof err === "object") {
      if (err.code === 11000) {
        if (Object.keys(err.keyValue).includes("username"))
          msg += `This username has already been taken!`;
        else if (Object.keys(err.keyValue).includes("email"))
          msg += "This email is already being used!";
      } else if (err.name === "ValidationError") {
        msg = Object.values(err.errors)
          .map((e: any) => e.message)
          .join(" ");
      }
    }

    res.status(400).json({
      status: "failed",
      message: msg,
    });
  }
}
