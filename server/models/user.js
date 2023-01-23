import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;
import dotenv from "dotenv";
dotenv.config();

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 1024,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tempPassword: {
      type: String,
      trim: true,
      default: null,
      match: [/^[A-Za-z0-9]{8}$/, "Wrong format"],
    },
  },
  { timestamps: true }
);

// Method to generate web token for a user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

export default mongoose.model("User", userSchema);
