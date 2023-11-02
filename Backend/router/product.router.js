import express from "express";
import {
  getAllProduct,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductBySubCat,
} from "../controller/product.controller";

import auth from "../middleware/auth.middleware";

const router = express.Router();

router.get("/get-allProducts", getAllProduct);

router.get("/get-productbysubCat/:subID", getProductBySubCat);

router.get("/get-singleProduct/:product_id", getProduct);

router.post("/addProduct", addProduct);

router.delete("/deleteProduct/:product_id", deleteProduct);
router.put("/updateProduct/:product_id", updateProduct);
export default router;
