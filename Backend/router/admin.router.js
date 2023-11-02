import express from "express";
import {
  getAdmin,
  addAdmin,
  signUp,
  getAllAdmin,
  login,
} from "../controller/admin.controller";

const router = express.Router();
router.get("/get-admin/:admin_id", getAdmin);

router.get("/get-all-admin", getAllAdmin);
router.post("/addAdmin", addAdmin);
router.post("/addAdmin", addAdmin);

router.post("/sign-up", signUp);
router.post("/login", login);

export default router;
