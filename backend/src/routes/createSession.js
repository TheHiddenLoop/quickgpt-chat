import { Router } from "express";
import { createSession } from "../controllers/session.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

export const sessionRouter = Router();

sessionRouter.post("/create", protectRoute, createSession);