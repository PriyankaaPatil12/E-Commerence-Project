import mongoose from "mongoose";
import categoryModel from "./category.model";
import subCategoryModel from "./subCategory.model";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: categoryModel,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: subCategoryModel,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: [String],
    default: null,
  },
  size:{
    type:[String],
    default:null,
  },
  color:{
      type:String,
      default:null,
    },
  status: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("Product", ProductSchema);
