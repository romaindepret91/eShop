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
    default: function () {
      return slugify(this.name);
    },
    trim: true,
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
