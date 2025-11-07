import { AppError } from "../middlewares/errorHandler";
import UrlSchema from "../models/url.model";
import { TryCatch } from "../utils/TryCatch";

export const getAllUrls=TryCatch(async(req,res)=>{
// @ts-ignore
    const userId=req.userId;
    console.log(userId);
    if(!userId){
        return res.status(400).json({
            message:"pls login"
        })
    }
        const allUrls = await UrlSchema.find({ user: userId }).sort({
          _id: -1,
        });
        if(!allUrls){
           return res.status(401).json({message:"No urls found"})
        }
        return res.status(200).json({
            urls:allUrls,
            message:"fetched successfully"
        })

})