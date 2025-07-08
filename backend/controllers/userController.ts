import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

type UserType = {
  _id: string;
  username: string;
  email: string;
  emailConfirm?: string;
  password?: string;
  passwordConfirm?: string;
  authProvider: string;
};

// const signTokens = (userId: string, sessionId: string) => {
//   const accessToken = jwt.sign({ userId, sessionId }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
//   });

//   const refreshToken = jwt.sign(
//     { userId, sessionId },
//     process.env.JWT_SECRET!,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
//     }
//   );

//   return { accessToken, refreshToken };
// };

// const createSendToken = (user: UserType, statusCode: number, res: Response) => {
//   //need to get sessionId somewhere or create it myself.
//   const { accessToken, refreshToken } = signTokens(user._id, sessionId);

//   const refreshCookieExpires = parseInt(
//     process.env.JWT_REFRESH_COOKIE_EXPIRES_IN!
//   );

//   const refreshCookieOptions = {
//     expires: new Date(Date.now() + refreshCookieExpires * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     sameSite: "none" as "none",
//     secure: true,
//   };

//   res.cookie("refreshToken", refreshToken, refreshCookieOptions);

//   user.password = undefined;

//   res.status(statusCode).json({
//     status: "success",
//     accessToken,
//     data: {
//       user,
//     },
//   });
// };

export async function signUp(req: Request, res: Response, next: NextFunction) {
  // req.body needs to include the authProvider so that we know which route to take in signUp
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
