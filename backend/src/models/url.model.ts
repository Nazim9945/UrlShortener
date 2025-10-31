import   { Schema,Document, model } from "mongoose";
interface UrlDoc extends Document{
    fullUrl:string,
    shortUrl:string,
    mappId:string
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
    }
})

const UrlSchema = model<UrlDoc>('UrlSchema',urlSchema)
export default UrlSchema
