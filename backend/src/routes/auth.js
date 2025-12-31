import { Router } from "express";
import { logout, me, signin, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import upload from "../middleware/multer.js";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", signin);
authRouter.get("/me", protectRoute, me);
authRouter.put("/update", protectRoute, upload.single("image"), updateProfile);
authRouter.post("/logout", protectRoute, logout);