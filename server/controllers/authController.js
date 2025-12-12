import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //Details get from req.body
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please valid inputs...!" });
    }

    //Check email is already register
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //Check username is already register
    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return res.status(400).json({ message: "Username already registered" });
    }

    //Password bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user to mongodb using mongoose

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    //Check newUser register
    if (newUser) {
      await newUser.save();
      res.status(201).json({ message: "New user register success.", newUser });
    } else {
      res.status(400).json({ error: "User not register failed." });
    }
  } catch (error) {
    //If not complete user register this catch blok is run

    console.log("Error from Register authController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    //Details get from req.body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please valid inputs...!" });
    }

    //User check with database
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "Email not register...!" });
    }

    //User req password and database password compare with bcrypt

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    //Sent to login process without password filed

    const user = await User.findOne({ email });

    //Token generate
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    if (isPasswordValid) {
      return res
        .status(200)
        .json({ message: "User Login success", token, user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error from login authController:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    //User id get from verifyToken middleware
    const userid = req.user.id;

    if (!userid) {
      res.json({ message: "not get user id" });
    }

    //User get from database without password
    const user = await User.findById(userid).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User and Id is not found" });
    } else {
      //Once User find sent to client

      res.status(200).json({ message: "User profile:", user });
    }
  } catch (error) {
    console.log("Error from profile authController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
