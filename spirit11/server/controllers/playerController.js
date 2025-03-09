import playerModel from "../models/playerModel.js";
import { computePlayerStats } from "../services/playerServices.js";

export const addPlayer = async (req, res) => {
  let {
    name,
    university,
    category,
    totalRuns,
    ballsFaced,
    inningsPlayed,
    wickets,
    oversBowled,
    runsConceded,
  } = req.body.player;

  if (
    !name ||
    !university ||
    !category ||
    !totalRuns ||
    !ballsFaced ||
    !inningsPlayed ||
    !wickets ||
    !oversBowled ||
    !runsConceded
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  totalRuns = Number(totalRuns);
  ballsFaced = Number(ballsFaced);
  inningsPlayed = Number(inningsPlayed);
  wickets = Number(wickets);
  oversBowled = Number(oversBowled);
  runsConceded = Number(runsConceded);

  const playerStats = computePlayerStats(
    totalRuns,
    ballsFaced,
    inningsPlayed,
    wickets,
    oversBowled,
    runsConceded
  );

  const {
    battingStrikeRate,
    battingAverage,
    bowlingStrikeRate,
    economyRate,
    playerPoints,
    playerValue,
  } = playerStats;

  try {
    //   console.log({
    //     name,
    //     university,
    //     category,
    //     totalRuns,
    //     ballsFaced,
    //     inningsPlayed,
    //     wickets,
    //     oversBowled,
    //     runsConceded,
    //     battingStrikeRate,
    //     battingAverage,
    //     bowlingStrikeRate,
    //     economyRate,
    //     playerPoints,
    //     playerValue,
    //   });


    console.log({
      name,
      university,
      category,
      totalRuns,
      ballsFaced,
      inningsPlayed,
      wickets,
      oversBowled,
      runsConceded,
      battingStrikeRate,
      battingAverage,
      bowlingStrikeRate,
      economyRate,
      playerPoints,
      playerValue,
    });

    const player = new playerModel({
      name,
      university,
      category,
      totalRuns,
      ballsFaced,
      inningsPlayed,
      wickets,
      oversBowled,
      runsConceded,
      battingStrikeRate,
      battingAverage,
      bowlingStrikeRate,
      economyRate,
      playerPoints,
      playerValue,
    });

    player.save();
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getPlayers = async (req, res) => {
  try {
    // Fetch players, selecting only the 'username' and 'points' fields
    const players = await playerModel.find({}, "name playerPoints"); // Second argument specifies the fields to return

    // Return the players' data as JSON
    res.json({ success: true, players });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).send("Error querying players");
  }
};
