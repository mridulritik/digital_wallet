import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password :{
        type:Schema.Types.Mixed,
        required:true
    },
    walletBalance:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema)