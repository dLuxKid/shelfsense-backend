import mongoose from "mongoose";
import validator from "validator";
import slugify from "slugify";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 4,
    },
    slug: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,
    authentication: {
      password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});

export const UserModel = mongoose.model("User", UserSchema);
