import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields!" });
    }
    //   Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    // If registered, return:
    res.status(200).json({
      message: "User successfuly registered",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //   Check if user already exists
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword)) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // If logged in, return:
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Me
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

export default router;
