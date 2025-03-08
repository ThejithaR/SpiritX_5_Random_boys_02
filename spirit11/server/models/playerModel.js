import mongoose from "mongoose";

//Create a schema

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  totalRuns: {
    type: String,
    required: true,
  },
  ballsFaced: {
    type: String,
    required: true,
  },
  inningsPlayed: {
    type: String,
    required: true,
  },
  wickets: {
    type: String,
    required: true,
  },
  oversBowled: {
    type: String,
    required: true,
  },
  runsConceded: {
    type: String,
    required: true,
  },
  // methana edit kranna thiyei
  battingStrikeRate: {
    type: Number,
    default: 0,
  },
  battingAverage: {
    type: Number,
    default: 0,
  },
  bowlingStrikeRate: {
    type: Number,
    default: 0,
  },
  economyRate: {
    type: Number,
    default: 0,
  },
  playerPoints: {
    type: Number,
    default: 0,
  },
  playerValue: {
    type: Number,
    default: 0,
  },
});

//userModel will only be created if it is not already created
const playerModel = mongoose.models.player || mongoose.model('player', playerSchema);

export default playerModel;