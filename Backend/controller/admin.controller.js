import AdminModel from "../modal/admin.model";

import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllAdmin = async (req, res) => {
  try {
    const adminData = await AdminModel.find();
    if (adminData) {
      return res.status(200).json({
        data: adminData,
        message: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getAdmin = async (req, res) => {
  try {
    const id = req.params.admin_id;

    const adminData = await AdminModel.findOne({ _id: id });
    if (adminData) {
      return res.status(200).json({
        data: adminData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addAdmin = (req, res) => {
  try {
    const { username, email, password, contact } = req.body;
    const createdRecord = new AdminModel({
      username: username,

      email: email,
      password: password,
      contact: contact,
    });

    createdRecord.save();
    if (createdRecord) {
      return res.status(201).json({
        data: createdRecord,
        message: "Success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: error.message,
    });
  }
  
};

export const signUp = async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;
    const isEmail = validator.isEmail(email);
    const isPassword = validator.isStrongPassword(password);
    if (!isEmail) {
      return res.status(200).json({
        message: "invalid email",
      });
    } else if (!isPassword) {
      return res.status(200).json({
        message:
          "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
      });
    }
    const existAdmin = await AdminModel.findOne({ email: email });

    if (existAdmin) {
      return res.status(200).json({
        message: "admin already exist",
      });
    }
    const passToString = password.toString();

    const hashPassword = bcrypt.hashSync(passToString, 10);
    const newAdmin = new AdminModel({
      username: username,

      email: email,
      password: hashPassword,
      contact: contact,
    });
    newAdmin.save();
    if (newAdmin) {
      return res.status(201).json({
        message: "Successfully resgistered",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);
    const isEmail = validator.isEmail(email);
    const isPassword = validator.isStrongPassword(password);
    let success = false;

    if (!isEmail) {
      return res.status(401).json({
        message: "invalid email",
        success: false,
      });
    } else if (!isPassword) {
      return res.status(401).json({
        message:
          "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
        success: false,
      });
    }

    const checkAdmin = await AdminModel.findOne({ email: email });

    if (!checkAdmin) {
      return res.status(401).json({
        message: "email not exist Please signup",
        success: false,
      });
    }

    const passwordCompare = await bcrypt.compare(password, checkAdmin.password);
    if (!passwordCompare) {
      return res.status(401).json({
        message: "Invlaid credetianls",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: checkAdmin._id,
        email: checkAdmin.email,
      },
      "mysecretkey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token: token,
      message: "successfully login",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
