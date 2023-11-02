import express from "express";
import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  deleteQuantity,
  getAllCartItem,
} from "../controller/cart.controller";

const router = express.Router();

router.get("/getCartItems/:product_ID", getCartItems);
router.get("/getAllCart/", getAllCartItem);
router.get("/addToCart/:product_ID", addToCart);
router.patch("/updateQuantity/:cart_id", updateQuantity);
router.delete("/deleteCartItem/:cart_id", removeFromCart);

router.delete("/deleteCartQuantity/:cart_id", deleteQuantity);

export default router;
