import express from "express";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import auth from "../middleware/auth.js";

const router = express.Router();

// Register new account
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // Validation
    if (!email || !password || !passwordCheck) {
      return res
        .status(400)
        .json({ error: "Not all fields have been entered" });
    }

    if (password.length < 5) {
      return res.status(400).json({
        error: "Password needs to have a minimum of 6 characters",
      });
    }

    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ error: "Enter the same password twice for verification" });
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Account with this email already exists" });
    }

    displayName = displayName || email;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email: email,
      password: passwordHash,
      displayName: displayName,
    });
    const savedUser = await newUser.save();

    res
      .status(200)
      .json({ message: "Account creation successful!", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login to account
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Not all fields have been entered" });
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "No registered account found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.REACT_APP_JWT_SECRET);

    res.status(200).json({
      message: "Account login successful!",
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.user);
    res.status(200).json({ user: deleteUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/valid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ valid: false });
    }

    const verified = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ valid: false });
    }

    const user = await UserModel.findById(verified.id);
    if (!user) {
      return res.status(401).json({ valid: false });
    }

    res.status(200).json({ valid: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
