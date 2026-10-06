/* WHAT:  Auth controllers — signup, login, and current user profile */
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "3d",
  });
}

// POST /api/auth/signup ==> SIGNUP
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Check if the email is already registered
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        message: "Email is already signed up. Please log in instead.",
      });
    }

    // Password hashing happens in model/User pre-save hook
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    const token = signToken(user._id);

    return res.status(201).json({
      message: "Signed up successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({ message });
    }
    console.error("signup error:", err);
    return res.status(500).json({ message: "Signup failed" });
  }
}

// POST /api/auth/login ==> LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
}

// GET /api/auth/me (protected) ==> GET CURRENT USER
async function getMe(req, res) {
  // Return the authenticated user from req.user
  return res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
}

export { signup, login, getMe };
