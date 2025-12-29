import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { connectDB } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { chatRouter } from "./routes/chat.js";
import { paymentRouter } from "./routes/payment.js";
import { stripeWebhook } from "./controllers/webhook.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.post(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/ai", chatRouter);
app.use("/api/order", paymentRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running..." });
});

async function main() {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main();
