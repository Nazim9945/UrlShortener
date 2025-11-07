import mongoose,  { Schema,Document, model } from "mongoose";
export interface UrlDoc extends Document{
    fullUrl:string,
    shortUrl:string,
    clicks:number,
    user?:string
}
const urlSchema = new Schema<UrlDoc>({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

const UrlSchema = model<UrlDoc>('UrlSchema',urlSchema)
export default UrlSchema
