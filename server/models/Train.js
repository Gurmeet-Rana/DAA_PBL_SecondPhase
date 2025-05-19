import mongoose from "mongoose";

const TrainSchema=new mongoose.Schema({
    "Train Name": String,
    "Train Number": String,
    "Current Station": String,
    "Expected Arrival Time at This Station": String,
    "Actual Arrival Time at This Station": String,
    "Total Delay (mins)": Number,
    "Next Stations": Array,
    "Previous Stations": Array,
    "Current Time": String,
    "Route ID": String,
    "Final Destination": String
})

const Train=mongoose.model('Train',TrainSchema);
export default Train;