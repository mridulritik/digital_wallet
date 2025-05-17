import {User} from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"


const registerUser = async (req, res) => {
    // console.log(`register user controller`)
    const {name, userId, phone, password, walletBallance} = req.body
    if(!name||!userId||!phone||!password){
        res.status(400).json({alert:'please give all the field'})
    }
    const numberWalletBalance = Number(walletBallance)
    if(isNaN(numberWalletBalance)||numberWalletBalance<0){
        return res.status(400).json({alert:{walletBallance:'not a number'}})
    }

    const existingUser = await User.findOne({userId})
    if(existingUser){
        
        return res.status(401).json({
            alert:'user already existed'
        })
    }

    const encryptedPassword =await bcrypt.hash(password, 10)
    const userData = new User({
        name: name,
        userId:userId,
        phone:phone,
        password:encryptedPassword,
        walletBalance:walletBallance
    })
    const savedData = await userData.save()
    if (savedData){
        res.status(200).json({
            result: savedData,
            message:'Go to login page'})
    }
}

const userLogin = async (req, res)=>{
    // console.log(`userLogin controller`)
    //checks
    // get id and password
    //search it in db
    //compare password
    //store data in jwt
    //stor token in cookie

    const {phone, password} = req.body
    if(!phone||!password){
        return res.status(400).json({alert:'provide login credential (phone and password)'})
    }
    const userdata = await User.findOne({phone:phone})
    if(!userdata){
        return res.status(401).json({alert:'no such user present'})
    }
    const verifiedPassword = await bcrypt.compare(password,userdata.password)
    if(!verifiedPassword){
        return res.status(401).json({alert: 'password are wrong'})
    }
    const token = jwt.sign(
        {
        id:userdata._id,
        phone:userdata.phone,
        userId:userdata.userId
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_TIMEOUT
        }
    )

    return res
    .status(200)
    .cookie('token',token,{
        httpOnly:true,
        secure:true,
        maxAge: 15*60*1000
    })
    .json({message:'login successfully'})

}

const userLogout = async (req, res)=>{
    res.clearCookie('token')
    return res
    .status(200)
    .json({message: ' logout success full'})
}

const deleteAccount = async (req, res)=>{
    // console.log('delete account controller')
    const token = req.cookies?.token
    if(!token){
        return res
        .status(401)
        .json({alert: 'unauthorised request'})
    }
    const decodedToken =await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const phone = decodedToken.phone
    await User.findOneAndDelete({phone})
    return res
    .status(200)
    .clearCookie('token')
    .json({message:'your account has been deleted as per your request'})
}

export { 
    registerUser,
    userLogin,
    deleteAccount,
    userLogout
}