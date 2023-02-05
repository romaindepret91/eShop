import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const apparelSizesSchema = new Schema(
  {
    xs: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      required: true,
    },
    s: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      required: true,
    },
    m: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      required: true,
    },
    l: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      required: true,
    },
    xl: {
      type: Number,
      trim: true,
      default: 0,
      min: 0,
      required: true,
    },
    xxl: {
      type: Number,
      trim: true,
      min: 0,
      required: true,
    },
  },
  { strict: true }
);

const ozSizesSchema = new Schema({
  "8oz": {
    type: Number,
    trim: true,
    default: 0,
    min: 0,
  },
  "10oz": {
    type: Number,
    trim: true,
    default: 0,
    min: 0,
  },
  "12oz": {
    type: Number,
    trim: true,
    default: 0,
    min: 0,
  },
  "14oz": {
    type: Number,
    trim: true,
    default: 0,
    min: 0,
  },
  "16oz": {
    type: Number,
    trim: true,
    default: 0,
    min: 0,
  },
});

const noSizeSchema = new Schema({
  stock: {
    Type: Number,
    default: 0,
    min: 0,
  },
});

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
    hasSize: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Schema.Types.Mixed,
      oneOf: [apparelSizesSchema, ozSizesSchema, noSizeSchema],
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
  { timestamps: true, strict: true }
);

export default mongoose.model("Product", productSchema);
