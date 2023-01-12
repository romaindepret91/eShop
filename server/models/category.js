import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
