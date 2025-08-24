import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,

    },
     fullName:{
        type:String,
        required:true,
        

    }
    ,
     password:{
        type:String,
        required:true,
        
    },
    profilePic:{
        type:String,
        default:""
        
    }
},{timestamps:true});
const User=mongoose.model("AuthUser",userSchema);
export default User;