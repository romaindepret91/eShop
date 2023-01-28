import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLegnth: 2,
      maxLength: 32,
    },
    slug: {
      type: String,
      lowercase: true,
      default: function () {
        return slugify(this.name);
      },
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 32,
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    sizingGroup: {
      type: String,
      trim: true,
      enum: ["women", "men", "kids"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: [Object],
      default: [],
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
