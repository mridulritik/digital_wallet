import bcrypt from "bcrypt"
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"


const accountDetail = async (req, res) => {
    console.log(`accoutdetail controller`)
}

const checkBalance = async (req, res) => {
    // console.log(`check balance controller`);
    const token = req.cookies?.token
    if(!token){
        return res.status(400).json({alert:'unauthorised request'})
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const userId = decodedToken.userId
    const data = await User.findOne({userId:userId})
    return res.status(200).json({ballance:data.walletBalance})
}

const transferAmount = async (req, res) => {
    // console.log(`transferAmount controller`);
    //receiver userid 
    //sender password
    //amount to be transfer
    //check and compare wallet balance is sufficient 
    //check sender wallet balance and add it
    //update the transaction data in mongodb transaction
    const { receiver_userId, sender_password, amount } = req.body
    if (!receiver_userId || !sender_password || !amount) {
        return res.status(400).json({ alert: 'please provied all detail' })
    }
     const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ alert: 'Invalid transfer amount' });
    }
    

    const token = req.cookies.token
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userId = decodedToken.userId

    if (!userId) {
        return res.status(401).json({ alert: 'Unauthorised request' })
    }
    const senderDetail = await User.findOne({ userId: userId })
    const pass = await bcrypt.compare(sender_password, senderDetail.password)
    if (!pass) {
        return res
            .status(402)
            .json({ alert: 'password are wrong' })
    }

    const receiverDetail = await User.findOne({ userId: receiver_userId })

   
    if (numericAmount > senderDetail.walletBalance) {
        return res.status(400).json({ alert: 'Insufficient ballance' })
    }
    const updatedBalanceSender = senderDetail.walletBalance - numericAmount
    await User.findOneAndUpdate({ userId: userId },
        { $set: { walletBalance: updatedBalanceSender } }
    )
    const updatedBalanceReceiver = receiverDetail.walletBalance + numericAmount
    await User.findOneAndUpdate({ userId: receiver_userId },
        { $set: { walletBalance: updatedBalanceReceiver } }
    )

    const transactionData = new Transaction({
        senderId: userId,
        receiverId: receiver_userId,
        transferAmount: numericAmount
    })
    const transfer = await transactionData.save()
    return res
        .status(200)
        .json({ success: transfer })
}

const accountHistory = async (req, res) => {
    console.log(`accounthistory controller`);
}

//add balance

export { accountDetail, checkBalance, transferAmount, accountHistory }