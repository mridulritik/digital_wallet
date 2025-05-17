import cookieParser from "cookie-parser"
import express from "express"

const app = express()

app.use(express.json({limit:"15kb"}))
app.use(express.urlencoded({extended:true ,limit:'15kb'}))
app.use(cookieParser())


// routing statement
import  userRouter  from "./src/router/user.router.js"
import  transactionRouter  from "./src/router/transaction.router.js"

app.use('/api/v1/transaction',transactionRouter)
app.use('/api/v1/user',userRouter)

export default app