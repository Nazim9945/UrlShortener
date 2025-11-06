import jwt, { JwtPayload } from "jsonwebtoken";
import { TryCatch } from "./TryCatch";
import { NextFunction ,Request,Response} from "express";

export const addUser=TryCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.accessToken;
    if(!token) {
        next();
        return;
    }
     const decode=jwt.verify(token,process.env.SECRET as string) as JwtPayload;
        console.log(decode,"...jwtpayload")
        if(decode.id){
            // @ts-ignore
            req.userId=decode.id
            
        }
        next();
        
})