import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./lib/db.js";
import Train from "./models/Train.js";
 

const app=express();

const PORT=process.env.PORT||5000;

app.use(express.json());
app.use(cors());

//Connect to mongodb

await connectDB();

//API endpoint to get all trains
app.get("/api/trains",async(req,res)=>{
    try{
        const trains=await Train.find();
        res.json(trains);
    }
    catch(err)
    {
        res.status(500).json({
            error:'Failed to get data'
        });
    }
})
 

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT ${PORT}`);
})