
import mongoose ,{ Schema} from 'mongoose'
const User=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    }
})

const UserSchema=mongoose.model("UserSchema",User)
export default UserSchema