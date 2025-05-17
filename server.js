import app from "./app.js"
import connectdb from "./src/DB/index.js"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

connectdb()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is running on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`error while connecting db in foleder server.js ${error}`)
})
