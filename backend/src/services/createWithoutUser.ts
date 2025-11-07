import UrlSchema, { UrlDoc } from "../models/url.model";


export const createWithoutUser = async (url: string, token_id: string) => {
      const newdoc = new UrlSchema({
             fullUrl: url,
             shortUrl:token_id
           });
    
           await newdoc.save();
           return newdoc
}