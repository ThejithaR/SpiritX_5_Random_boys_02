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
    //console.log(team);

    const players = await getPlayersByIDs({ playerIds: team });
    console.log(players);
    res.json({ success: true, players, budget });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const undoPurchase = async (req, res) => {
  try {
    console.log(req.body);

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

    console.log(updatedUser)
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
    const { userId, playerId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }
    const player = await playerModel.findById(playerId);
    if (!player) {
      return res.json({ success: false, message: "Player not found!" });
    }
    if (user.budget < player.playerValue) {
      return res.json({ success: false, message: "Insufficient budget" });
    }
    user.budget -= player.value;
    user.team.push(playerId);
    await user.save();
    res.json({ success: true, message: "Player added to team successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
