import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const dbconnect=async()=>{
    try {
       const conn=await mongoose.connect(process.env.dbURL as string);
       console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}