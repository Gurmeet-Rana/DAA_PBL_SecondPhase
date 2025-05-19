import express from "express";
import mongoose from "mongoose";


const connectDB=async()=>{
    try
    {
        mongoose.connection.on('connected',()=>{
            console.log('MongoDB Connected');
        })

        await mongoose.connect(`${process.env.MONGODB_URI}/TrainData`);
        
    }
    catch(error)
    {
        console.log('Error in connecting with database in db.js '+error);
    }
}
export default connectDB;