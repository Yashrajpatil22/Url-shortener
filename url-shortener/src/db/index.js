import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = async() => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        if(conn){
            console.log("DB connection successful");    
        }

    }
    catch(error){
        console.log("Db connection failed", error);
        process.exit(1);
        
    }
}

export default connectDb;