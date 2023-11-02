import express from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  SingUp,
  login,
  loginOtp,
  generateOtp,
  deleteUserTemp,
} from "../controller/user.controller";

const router = express.Router();

router.get("/get-usersAll", getAllUsers);

router.get("/get-singleUser/:user_id", getUser);

router.post("/addUser", addUser);

router.delete("/deleteUser/:user_id", deleteUser);

router.patch("/deleteUserTemp/:user_id", deleteUserTemp);

router.put("/updateUser/:user_id", updateUser);

router.post("/sign-up", SingUp);

router.post("/login", login);
router.get("/loginOtp", loginOtp);

router.patch("/generateOtp", generateOtp);

export default router;
