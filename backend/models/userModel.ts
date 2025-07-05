import { Schema, model } from "mongoose";

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
        validator: function (val) {
          return val === this.password;
        },
      },
    },
    authProvider: { type: String, enum: ["local", "google", "github"] },
    providerId: String,
    createdAt: Date,
    updatedAt: Date,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

//pre-save middleware here

const User = model("User", userSchema);

export default User;
