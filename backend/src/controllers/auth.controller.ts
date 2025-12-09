import { TryCatch } from "../utils/TryCatch";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AppError } from "../middlewares/errorHandler";
import UserSchema from "../models/user.model";
import { CookieOptions } from "express";
dotenv.config()
const registerUser=TryCatch(async(req,res)=>{
    const {name,email,password}=req.body;
    // Zod validation-->pending
    if(!name || !email || !password){
      return new AppError("Invalid Credential",401)
    }
    const isExist=await UserSchema.findOne({email:email});
    if(isExist){
        throw new Error("this email is registered already");
    }

    const newUser=new UserSchema({
        name,
        email,
        password
    })
    await newUser.save();
    // Registration logic here
    const payload={
        id:newUser._id,
    }
    const token=jwt.sign(payload,process.env.SECRET as string,{expiresIn:"1d"});
     const options = {
       maxAge: 24 * 60 * 60 * 1000,
       httpOnly: true,
     };
     res.cookie("accessToken", token, options);
    res.status(201).json({ token,message: "User registered successfully" });
});

const loginUser=TryCatch(async(req,res)=>{
    // Login logic here
    console.log(req.body);
    // ZOd validation
    const {email,password}=req.body;
    const isExist=await UserSchema.findOne({email:email});
    if(!isExist){
        throw new Error("Pls registered first");
    }
    if(isExist.password!==password){
        return new AppError("Invalid Credential",401)
    }
      const payload = {
        id: isExist._id,
      };
      const token = jwt.sign(payload, process.env.SECRET as string, {
        expiresIn: "1d",
      });
      const options= {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV == "production",
      } as CookieOptions
      res.cookie("accessToken",token,options)
      
    res.status(200).json({ token,message: "User logged in successfully" });
}); 


const meProfile=TryCatch(async(req,res)=>{
  
      // @ts-ignore
      const userId=req.userId
    
        if(userId){
            const user=await UserSchema.findOne({_id:userId}).select("-password")
            
            return res.status(200).json({
              user
            })
        }
        return res.status(200).json({
          user:null,
        });
        
  

}) 
const signout=TryCatch(async(req, res) => {
  res.clearCookie("accessToken");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
})
export {registerUser,loginUser,meProfile,signout}