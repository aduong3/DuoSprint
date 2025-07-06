import { Document, Schema, model } from "mongoose";

const userSchema = new Schema(
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
    password: { type: String, select: false },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (
          this: Document & { password: string; authProvider: string },
          val: string
        ) {
          if (this.authProvider !== "local") return true;
          return val === this.password;
        },
      },
      message: "Passwords do not match!",
    },
    authProvider: { type: String, enum: ["local", "google", "github"] },
    providerId: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

//pre-save middleware here

const User = model("User", userSchema);

export default User;
