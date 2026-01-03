import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  fullName: String,
  jerseyNumber: Number,
  position: String,
  jerseySize: String,
  phone: String
});

const TeamSchema = new mongoose.Schema({
  teamNumber: Number,
  companyName: String,
  email: String,
  players: [PlayerSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
