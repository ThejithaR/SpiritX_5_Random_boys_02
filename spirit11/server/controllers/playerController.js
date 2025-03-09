import playerModel from "../models/playerModel.js";
import userModel from "../models/userModel.js";
import { computePlayerStats, calPlayerPoints } from "../services/playerServices.js";

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

export const fetchPlayers = async (req, res) => {
  
  try {
      const players = await playerModel.find();
      console.log("Fetched players:", players);
      if (!players || players.length === 0) {
          return res.status(404).json({ success: false, message: "No players found"});
      }
      return res.json({ success: true, message: "Players fetched successfully", players:players });
  } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message});

}};

export const getPlayers = async (req, res) => {
  try {
    const users = await userModel.find(
      {},
      "username playerPoints team teamPoints"
    );
    await Promise.all(
      users.map(async (user) => {
        user.teamPoints = await calPlayerPoints(user.team);
      })
    );
    console.log(users);
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).send("Error querying players");
}

};

// export const searchPlayers = async (req, res) => {
//   try {
//     const searchTerm = req.body.searchTerm;
//     console.log(searchTerm);
//     //console.log(req);
//     if (!searchTerm) {
//       return res.status(400).json({ success: false, message: "Search term is required" });
//     } 
//     const players = await playerModel.find(
//       { name: { $regex: searchTerm, $options: "i" } },
//       "name university category playerValue"
//     );
//     res.json({ success: true, players });
//   } catch (error) {
//     //console.log(error);
//     console.error("Error searching players:", error);
//     res.status(500).send("Error searching players");
//   }
// }

export const searchPlayers = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    console.log("Search Term:", searchTerm);

    if (!searchTerm) {
      return res.status(400).json({ success: false, message: "Search term is required" });
    }

    const players = await playerModel.find(
      {
        $expr: {
          $regexMatch: {
            input: { $concat: ["$name", " ", "$university", " ", "$category"] },
            regex: searchTerm,
            options: "i"
          }
        }
      },
      "name university category playerValue"
    );

    res.json({ success: true, players });
  } catch (error) {
    console.error("Error searching players:", error);
    res.status(500).send("Error searching players");
  }
};



export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const player = await playerModel.findById(id);
    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }

    return res.json({ success: true, player });

  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).send("Error querying players");
  }
};
