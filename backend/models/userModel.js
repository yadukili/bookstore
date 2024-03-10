import mongoose from 'mongoose';


const newSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const User= mongoose.model('collections', newSchema);