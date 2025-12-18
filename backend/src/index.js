import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { connectDB } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import {createClient} from "redis";
import { sessionRouter } from "./routes/createSession.js";
import {serve} from "inngest/express"
import { functions, inngest } from "./libs/inngest.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

export const client = createClient({url: process.env.REDIS_URL});

await client.connect();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use("/api/inngest", serve({client:inngest}, functions));
app.use("/api/auth", authRouter);
app.use("/api/session", sessionRouter);

app.get("/", (req, res) => {
    return res.status(200).json({ success: true, message: "Server is running..." });
});

async function main() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is ruung at: http://localhost:${PORT}`);
    })
}
main();