import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    // img: { type: String, required: true },
    img: [String],
    category: { type: String, required: true },
    price: { type: Number, required: true },
    size: [String],
    color: [String],

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    details: [String],
    comments: [String],
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
