import { NextFunction, Request, Response } from "express";
import generateid from "../utils/generateid";
import UrlSchema from "../models/url.model";
import { TryCatch } from "../utils/TryCatch";
import dotenv from "dotenv";
import { AppError } from "../middlewares/errorHandler";
import { createWithoutUser } from "../services/createWithoutUser";
import { createWithUser } from "../services/createWithUser";
dotenv.config();
const createShortUrl = TryCatch( async(req: Request, res: Response,next:NextFunction) => {
 
    const {url,slug} = req.body;
    console.log(url,slug);
    if(!url){
      return res.status(401).json({
        message:"No url"
      })
    }
    // @ts-ignore
    const userId=req.userId;
    const token_id =slug? slug : generateid(8);
    if(slug){
      const checkSlug=await UrlSchema.findOne({shortUrl:slug});
     
      if(checkSlug)  {
       return  next(new AppError("This custom name already exist",409))
      }
    }
    let newdoc;
    if(!userId){
     newdoc=await createWithoutUser(url,token_id)
      
       
    }
    else{
     newdoc =await createWithUser(url, token_id,userId);
    }
    console.log(newdoc)
    res.status(200).json({
      newdoc
    });
    
  } )

export default createShortUrl;