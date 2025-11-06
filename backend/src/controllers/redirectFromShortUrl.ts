import { NextFunction, Request, Response } from "express";
import UrlSchema from "../models/url.model";
import { TryCatch } from "../utils/TryCatch";
import { AppError } from "../middlewares/errorHandler";
const redirectFromShortUrl = TryCatch( async (req: Request, res: Response,next:NextFunction) => {
    
    const token_id = req.params.id;
   console.log(token_id)
    if (!token_id) {
      return new AppError("Invalid URL", 400);
      
    }
    
    const urldoc = await UrlSchema.findOneAndUpdate(
      { shortUrl: token_id },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    
    console.log(urldoc,".....testing");
    if (!urldoc) {
    throw new AppError("URL not found", 404);
    }
    
    res.redirect(urldoc.fullUrl);
  
} )

export default redirectFromShortUrl;