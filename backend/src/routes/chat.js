import { Router } from "express";
import { messageSend } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

export const chatRouter = Router();

chatRouter.post("/chat/message", protectRoute,  messageSend);