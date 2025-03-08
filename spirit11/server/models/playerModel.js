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
    type: Number,
    required: true,
  },
  ballsFaced: {
    type: Number,
    required: true,
  },
  inningsPlayed: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    required: true,
  },
  oversBowled: {
    type: Number,
    required: true,
  },
  runsConceded: {
    type: Number,
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