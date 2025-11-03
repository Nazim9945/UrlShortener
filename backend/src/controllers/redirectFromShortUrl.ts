import { Request, Response } from "express";
import UrlSchema from "../models/url.model";
const redirectFromShortUrl = async (req: Request, res: Response) => {
  try {
    const token_id = req.params.id;
   
    if (!token_id) {
      return res.status(400).json({
        message: "Bad request, id is missing",
      });
    }

    const urldoc = await UrlSchema.findOneAndUpdate(
      { shortUrl: token_id },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!urldoc) {
      return res.status(400).json({
        message: "Could not find this site",
      });
    }

    res.redirect(urldoc.fullUrl);
  } catch (error) {
    console.log(error);
  }
};
export default redirectFromShortUrl;