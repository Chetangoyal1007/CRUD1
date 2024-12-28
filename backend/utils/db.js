import mongoose from "mongoose";

const dbcon=async()=>{
    try{
        await mongoose.connect(process.env.db_URL)
        console.log('Database connected');
    }catch(error){
        console.log('Error:',error.message);
    }   
}
export default dbcon;