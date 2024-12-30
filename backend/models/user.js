import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    fathername:{
        type:String,
        
    },
    mothername:{
        type:String,
        
    },
    email: {
        type: String,
        
        
    },
    phoneno:{
        type:Number,
        
    }
}, {timestamps: true});

const usermodels=mongoose.model('user',userSchema);
export default usermodels;