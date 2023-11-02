import express from "express";
import {
  getAllSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategory,
  getAllSubCategoryByCategoryId,
} from "../controller/subCategory.controller";

const router = express.Router();

router.get("/get-allSubCategory", getAllSubCategory);

router.get("/get-SubCategory/:category_id", getAllSubCategoryByCategoryId);


router.get("/get-singleSubCategory/:subcategory_id", getSubCategory);

router.post("/addSubCategory", addSubCategory);

router.delete("/deleteSubCategory/:subcategory_id", deleteSubCategory);

router.put("/updateSubCategory/:subcategory_id", updateSubCategory);

export default router;

