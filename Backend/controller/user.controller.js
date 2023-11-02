import UserModel from "../modal/user.modal";
import multer from "multer";
import fs, { chown } from "fs";
import path from "path";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

import otpGenerator from "otp-generator";

// import client from "twilio";
// const accountSid = "AC476ccfb50d8af29031cacd2044608e82";
// const authToken = "7502be316481e1897dda0ef033aebbe1";
// const client = require("twilio")(accountSid, authToken);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/user")) {
      cb(null, "./uploads/user");
    } else {
      fs.mkdirSync("./uploads/user");
      cb(null, "./uploads/user");
    }
  },
  filename: function (req, file, cb) {
    const name = file.originalname;
    const ext = path.extname(name);
    const nameArr = name.split(".");
    nameArr.pop();
    const fname = nameArr.join(".");
    const fullName = fname + "-" + Date.now() + ext;
    cb(null, fullName);
  },
});

const upload = multer({ storage: storage });

export const getAllUsers = async (req, res) => {
  try {
    const userData = await UserModel.find();
    if (userData) {
      return res.status(200).json({
        data: userData,
        message: "success",
        path: "http://localhost:8001/uploads/user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.user_id;

    const userData = await UserModel.findOne({ _id: id });
    if (userData) {
      return res.status(200).json({
        data: userData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addUser = (req, res) => {
  try {
    const uploadData = upload.single("avatar");
    uploadData(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const {
        firstName,
        lastName,
        email,
        password,
        contact,
        dob,
        gender,
        about,
        otp,
        status,
      } = req.body;

      let avatar = null;
      if (req.file !== undefined) {
        avatar = req.file.filename;
      }

      const createdRecord = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        contact: contact,
        dob: dob,
        gender: gender,
        about: about,
        otp: otp,
        status: status,
        avatar: avatar,
      });

      createdRecord.save();

      if (createdRecord) {
        return res.status(201).json({
          data: createdRecord,
          message: "Success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.user_id;

    const userAvatar = await UserModel.findOne({ _id: id });
    console.log(userAvatar.avatar);
    //let image = userAvatar.avatar;

    if (fs.existsSync("./uploads/user/" + userAvatar.avatar)) {
      fs.unlinkSync("./uploads/user/" + userAvatar.avatar);
    }

    const deletedUser = await UserModel.deleteOne({ _id: id });
    if (deletedUser.acknowledged) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUserTemp = async (req, res) => {
  try {
    const id = req.params.user_id;

    const userAvatar = await UserModel.findOne({ _id: id });

    //let image = userAvatar.avatar;

    if (fs.existsSync("./uploads/user/" + userAvatar.avatar)) {
      fs.unlinkSync("./uploads/user/" + userAvatar.avatar);
    }

    const deletedUser = await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          status: 0,
        },
      }
    );
    if (deletedUser.acknowledged) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const uploadData = upload.single("avatar");
    uploadData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const id = req.params.user_id;

      const { firstName, lastName, email, contact, dob, gender, about } =
        req.body;

      const userData = await UserModel.findOne({ _id: id });

      let avatar = userData.avatar;

      if (req.file !== undefined) {
        avatar = req.file.filename;
        if (fs.existsSync("./uploads/user/" + userData.avatar)) {
          fs.unlinkSync("./uploads/user/" + userData.avatar);
        }
      }

      const updateUser = await UserModel.updateOne(
        { _id: id },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            contact: contact,
            dob: dob,
            gender: gender,
            about: about,
            avatar: avatar,
          },
        }
      );

      const updte = await UserModel.findOne({ _id: id });

      if (updateUser.acknowledged) {
        return res.status(200).json({
          confirmData: updateUser,
          data: updte,
          message: "updated",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const SingUp = async (req, res) => {
  try {
    const uploadData = upload.single("avatar");
    uploadData(req, res, async function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const { firstName, lastName, email, password, contact } = req.body;
      console.log(email);

      let avatar = null;
      if (req.file !== undefined) {
        avatar = req.file.filename;
      }

      const isEmail = validator.isEmail(email);
      const isPassword = validator.isStrongPassword(password);

      if (!isEmail) {
        return res.status(400).json({
          message: "invalid email",
        });
      } else if (!isPassword) {
        return res.status(400).json({
          message:
            "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
        });
      }

      const existUser = await UserModel.findOne({ email: email });

      if (existUser) {
        return res.status(400).json({
          message: "user already exist",
        });
      }
      const passToString = password.toString();

      const hashPassword = bcrypt.hashSync(passToString, 10);

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const newUser = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        contact: contact,
        // dob: dob,
        // gender: gender,
        // about: about,
        otp: otp,
        // avatar: avatar,
      });
      newUser.save();
      if (newUser) {
        return res.status(201).json({
          message: "Successfully resgistered",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = validator.isEmail(email);
    const isPassword = validator.isStrongPassword(password);

    if (!isEmail) {
      return res.status(400).json({
        message: "invalid email",
      });
    } else if (!isPassword) {
      return res.status(400).json({
        message:
          "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
      });
    }

    const checkUser = await UserModel.findOne({ email: email });

    if (!checkUser) {
      return res.status(400).json({
        message: "email not exist Please signup",
      });
    }

    const passwordCompare = await bcrypt.compare(password, checkUser.password);
    if (!passwordCompare) {
      return res.status(400).json({
        message: "Invlaid credetianls",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
      },
      "mysecretkey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token: token,
      message: "successfully login",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginOtp = async (req, res) => {
  try {
    const { contact, otp } = req.body;

    if (!contact) {
      return res.status(400).json({
        message: "invalid contact",
      });
    }

    const checkUser = await UserModel.findOne({ contact: contact });

    if (!checkUser) {
      return res.status(400).json({
        message: "contact not exist ,please create account",
      });
    }
    if (checkUser.otp !== otp) {
      return res.status(400).json({
        message: "invalid otp",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
      },
      "mysecretkey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "successfully login",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const generateOtp = async (req, res) => {
  try {
    const { contact } = req.body;

    const userData = await UserModel.findOne({ contact: contact });

    let otp;
    if (userData.contact === contact) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
    }

    if (!userData) {
      return res.status(200).json({
        message: "invalid number ",
      });
    }
    const updatedData = await UserModel.updateOne(
      { contact: contact },
      {
        $set: {
          otp: otp,
        },
      }
    );
    console.log(otp);
    console.log("userDAta.otp ", otp);

    //sending otp via email

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: "tobin.witting@ethereal.email",
    //     pass: "GT9MfkbZrHM6JbH9Em",
    //   },
    // });

    // const info = await transporter.sendMail({
    //   from: "random786@gmail.com",
    //   to: userData.email,
    //   subject: "testing email",
    //   text: otp,
    // });
    // console.log(info.messageId);

    if (updatedData) {
      return res.status(200).json({
        message: "otp send",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
