import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protectRoute middleware:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


