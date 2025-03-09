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
      const { userId, playerId } = req.body;
      const user = await userModel.findById(userId);
      if (!user) {
          return res.json({ success: false, message: "User not found!" });
      }
      const player = await userModel.team.findById(playerId);
        if (!player) {
            return res.json({ success: false, message: "Player not found!" });
      }
      await userModel.findOneAndDelete({ _id: playerId });
  } catch (error) {
        return res.json({ success: false, message: error.message });
  }
};
