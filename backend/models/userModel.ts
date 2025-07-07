import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  email: string;
  emailConfirm?: string;
  password?: string;
  passwordConfirm?: string;
  authProvider: "local" | "google" | "github";
  providerId?: string;
  role: "user" | "admin";

  isModified(field: string): boolean; // tell TS this method exists
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username was not provided"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email was not provided"],
      unique: true,
    },
    emailConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, val: string) {
          if (this.authProvider !== "local") return true;
          return val === this.email;
        },
        message: "Emails do not match!",
      },
    },
    password: { type: String, select: false },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, val: string) {
          if (this.authProvider !== "local") return true;
          return val === this.password;
        },
        message: "Passwords do not match!",
      },
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "github"],
      required: true,
    },
    providerId: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

//pre-save middleware here
userSchema.pre("save", async function (next: (err?: Error) => void) {
  if (!this.isModified("password") || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next: (err?: Error) => void) {
  if (!this.isModified("email")) return next();

  this.emailConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async (
  password: string,
  encryptedPassword: string
) => await bcrypt.compare(password, encryptedPassword);

const User = model<IUser>("User", userSchema);

export default User;
