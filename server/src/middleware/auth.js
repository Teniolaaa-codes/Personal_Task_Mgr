import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function protect(req, res, next) {
  let token;
//  Authorization so only logged-in users may hit task endpoints;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized. Please log in and send a Bearer token.",
    });
  }

  try {
    // Verify signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // use req.user.id to scope queries to this user only
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User no longer exists. Please sign up again.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
    });
  }
}

export { protect };