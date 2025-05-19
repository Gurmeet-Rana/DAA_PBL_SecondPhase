import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
  trainName: String,
  trainNumber: String,
  currentStation: String,
  expectedArrivalTimeAtThisStation: String,
  actualArrivalTimeAtThisStation: String,
  totalDelayMins: Number,
  nextStations: [String],       // specify Array of Strings
  previousStations: [String],   // specify Array of Strings
  currentTime: String,
  routeId: String,
  finalDestination: String
});

const Train=mongoose.model('Train',TrainSchema);
export default Train;