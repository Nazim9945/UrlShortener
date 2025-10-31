import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const dbconnect=async()=>{
    try {
       await mongoose.connect(process.env.dbURL as string);
       console.log("connected with db")
    } catch (error) {
        console.log(error);
    }
}