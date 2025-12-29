import { Router } from "express";
import { createCheckoutSession } from "../controllers/pricing.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

export const paymentRouter = Router();

paymentRouter.post("/checkout", protectRoute, createCheckoutSession);

