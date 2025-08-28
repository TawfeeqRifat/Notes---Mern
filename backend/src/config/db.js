import mongoose from "mongoose"

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    }catch(error){
        console.log("Error connecting to MongoDB",error);
        process.exit(1); //1 mean exit with failure // 0 means exit with success
    }
}