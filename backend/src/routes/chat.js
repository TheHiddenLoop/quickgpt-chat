import { Router } from "express";
import { messageSend, getConversations, getAllMessages } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

export const chatRouter = Router();

chatRouter.post("/chat/message", protectRoute,  messageSend);
chatRouter.get("/all/conversations", protectRoute,  getConversations);
chatRouter.get("/message/:conversationId", protectRoute,  getAllMessages);

