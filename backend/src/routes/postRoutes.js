import { Router } from "express";
import { allPosts, uploadPost } from "../controllers/post.controller.js";
import upload from "../middleware/multer.js";
import { protectRoute } from "../middleware/protectRoute.js";

export const postRoutes = Router();

postRoutes.post("/upload/post", protectRoute, upload.array("images", 10), uploadPost);
postRoutes.get("/all", protectRoute, allPosts)