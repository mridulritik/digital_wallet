import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required:true,
    },
    receiverId:{
        type:String,
        required:true
    },
    transferAmount:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Transaction = mongoose.model('Transaction',transactionSchema)