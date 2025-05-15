import mongoose from "mongoose"

export default async function dbConnect(){
    try{
        const response = await mongoose.connect("mongodb://localhost:")
        console.log("Successfully connected to mongoDB database")
        return response
    }catch(error){
        console.log(error)
        process.exit()
    }
}