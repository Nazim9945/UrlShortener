import { TryCatch } from "../utils/TryCatch";
import { AppError } from "./errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { NextFunction,Request,Response } from "express";
config()
const authMiddleWare=TryCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const {accessToken}=req.cookies
    if(!accessToken){
       return res.status(401).json({
        message:"Unauthorized"
       })
    }
    const decode=jwt.verify(accessToken,process.env.SECRET as string) as JwtPayload;
    console.log(decode,"...jwtpayload")
    if(decode.id){
        // @ts-ignore
        req.userId=decode.id
      return  next()
    }
     return res.status(401).json({
       message: "Unauthorized",
     });
    
})
export default authMiddleWare