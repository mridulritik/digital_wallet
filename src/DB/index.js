import mongoose from "mongoose";

const connectdb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(connection.connection.name)
    } catch (error) {
        console.log(`problem occur in connection string setup ./DB/index.js ${error}`)
    }
}

export default connectdb