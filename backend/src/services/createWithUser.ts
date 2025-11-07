import UrlSchema from "../models/url.model";


export const createWithUser=async(url:string,token_id:string,userId:string)=>{
       const newdoc = new UrlSchema({
         fullUrl: url,
         shortUrl:token_id,
         user: userId,
       });
       await newdoc.save();
       return newdoc
}