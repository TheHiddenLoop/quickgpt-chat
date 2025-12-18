import mongoose from "mongoose";

export const connectDb= async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Data base Connected", conn.connection.host);
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
}