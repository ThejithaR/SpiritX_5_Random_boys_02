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

    totalRuns = Number(totalRuns);
    ballsFaced = Number(ballsFaced);
    inningsPlayed = Number(inningsPlayed);
    wickets = Number(wickets);
    oversBowled = Number(oversBowled);
    runsConceded = Number(runsConceded);

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

    await player.save();
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
