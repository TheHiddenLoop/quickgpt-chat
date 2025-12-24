import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { connectDB } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import {createClient} from "redis";
import { postRoutes } from "./routes/postRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

export const client = createClient({url: process.env.REDIS_URL});


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use("/api/auth", authRouter);
app.use("/api/post", postRoutes);


app.get("/", (req, res) => {
    return res.status(200).json({ success: true, message: "Server is running..." });
});

async function main() {
    await Promise.all([client.connect(), connectDB()])
    app.listen(PORT, () => {
        console.log(`Server is ruung at: http://localhost:${PORT}`);
    })
}
main();