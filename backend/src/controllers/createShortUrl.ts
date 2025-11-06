import { NextFunction, Request, Response } from "express";
import generateid from "../utils/generateid";
import UrlSchema from "../models/url.model";
import { TryCatch } from "../utils/TryCatch";
import dotenv from "dotenv";
import { AppError } from "../middlewares/errorHandler";
dotenv.config();
const createShortUrl = TryCatch( async(req: Request, res: Response,next:NextFunction) => {
 
    const {url,slug} = req.body;
    // @ts-ignore
    const userId=req.userId;
    const token_id =slug? slug : generateid(8);
    if(slug){
      const checkSlug=await UrlSchema.findOne({ShortUrl:slug});
      if(checkSlug) return new AppError("This custom url already exists",401)
    }
    
    if(!userId){
       const newdoc = new UrlSchema({
         fullUrl: url,
         shortUrl:slug ? slug: token_id,
       });

       await newdoc.save();

       
    }
    else{
       const newdoc = new UrlSchema({
         fullUrl: url,
         shortUrl: slug ? slug : token_id,
         user: userId,
       });
       await newdoc.save()
    }
    res.status(200).json({
      shortUrl: (process.env.shortUrlDomain as string) + "/" + token_id,
    });
    
  } )

export default createShortUrl;