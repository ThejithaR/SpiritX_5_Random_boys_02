import playerModel from "../models/playerModel.js";
import userModel from "../models/userModel.js";
import { getPlayersByIDs } from "../services/playerServices.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    res.json({
      success: true,
      userData: {
        username: user.username,
        isAccountVerified: user.isAccountVerified,
        role: user.role,
      },
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const fetchTeam = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    const team = user.team;
    const budget = user.budget;

    const players = await getPlayersByIDs({ playerIds: team });
    res.json({ success: true, players, budget });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const undoPurchase = async (req, res) => {
  try {

    const { userId, playerId } = req.body;

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { team: playerId } }, // Removes `playerId` from the `team` array
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    await user.save();

    return res.json({
      success: true,
      message: "Player removed from team!",
      team: user.team,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const buyPlayer = async (req, res) => {
  try {
    console.log(req.body);
    const { playerId, userId } = req.body;
    console.log(playerId, userId);
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.json({ success: false, message: "User not found!" });
    }
    console.log(user.username);
    const player = await playerModel.findById(playerId);
    if (!player) {
      console.log("Player not found");
      return res.json({ success: false, message: "Player not found!" });
    }
    console.log(player.name);
    if (user.budget < player.playerValue) {
      console.log("Insufficient budget");
      return res.json({ success: false, message: "Insufficient budget" });
    }

    user.budget -= player.playerValue;

    if (!Array.isArray(user.team)) {
      user.team = [];
    }
    
    if (user.team.length >= 11) {
      return res.json({ success: false, message: "Team is full" });
    }
    
    if (user.team.includes(playerId)) {
      return res.json({ success: false, message: "Player already in team" });
    }
    
    user.team.push(playerId);
    await user.save();

    console.log("Updated budget:", user.budget);
    console.log("Updated team:", user.team);
    res.json({ success: true, message: "Player added to team successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const fetchNoOfPlayers = async (req, res) => { 
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    const noOfPlayers = user.team.length;
    res.json({ success: true, noOfPlayers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}