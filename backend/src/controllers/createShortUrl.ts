import { NextFunction, Request, Response } from "express";
import generateid from "../utils/generateid";
import UrlSchema from "../models/url.model";
import { TryCatch } from "../utils/TryCatch";
import dotenv from "dotenv";
dotenv.config();
const createShortUrl = TryCatch( async(req: Request, res: Response,next:NextFunction) => {
 
    const { url } = req.body;
    const token_id = generateid(8);
    
    const newdoc = new UrlSchema({
      fullUrl: url,
      shortUrl: token_id,
    });
   
    await newdoc.save();
   
    res.send(process.env.shortUrlDomain as string + "/" + token_id);
  } )

export default createShortUrl;