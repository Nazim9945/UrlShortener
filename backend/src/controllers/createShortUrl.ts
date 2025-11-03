import { Request, Response } from "express";
import generateid from "../utils/generateId";
import UrlSchema from "../models/url.model";
const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    const token_id = generateid(8);
    const newdoc = new UrlSchema({
      fullUrl: url,
      shortUrl: token_id,
    });

    await newdoc.save();
   
    return res.status(200).json({
      newdoc,
      message: "Done with shortning url",
    });
  } catch (error) {
    console.log(error);
  }
};
export default createShortUrl;