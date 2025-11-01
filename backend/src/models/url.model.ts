import   { Schema,Document, model } from "mongoose";
interface UrlDoc extends Document{
    fullUrl:string,
    shortUrl:string,
    mappId:string,
    clicks:number
}
const urlSchema=new Schema<UrlDoc>({
    fullUrl:{
        type:String,
        required:true,
        unique:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    mappId:{
        type:String,
        required:true,
        unique:true
    },
    clicks:{
        type:Number,
        default:0

    }
})

const UrlSchema = model<UrlDoc>('UrlSchema',urlSchema)
export default UrlSchema
