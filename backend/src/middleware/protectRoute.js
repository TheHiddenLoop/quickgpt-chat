import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { client } from "../index.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id.toString();

    const cachedUser = await client.get(userId);
    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      console.log("Here");
      
      return next();
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await client.set(userId, JSON.stringify(user), { EX: 300 });

    req.user = user;
    next();

  } catch (error) {
    console.error("protectRoute error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
