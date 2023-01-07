import mongoose from "mongoose";
const { Schema } = mongoose;

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

export default mongoose.model("User", userSchema);
