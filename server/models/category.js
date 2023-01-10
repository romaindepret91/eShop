import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 2,
    maxLength: 32,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
