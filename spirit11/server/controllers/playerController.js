import playerModel from '../models/playerModel.js';
import { computePlayerStats } from '../services/playerServices.js';

export const addPlayer = async (req,res) => {
    const {
        name,
        university,
        catogary,
        totalRuns,
        ballsFaced,
        inningsPlayed,
        wickets,
        oversBalled,
        runsConceded,
    } = req.body;
    //totalWickets,totalBallsBowled,totalRunsConceded
    //battingStrikeRate , battingAverage , bowlingStrikeRate , economyRate , playerPoint , playerValue

    if(!name || !university || !catogary || !totalRuns || !ballsFaced || !inningsPlayed || !wickets || !oversBalled || !runsConceded ){
        return res.status(400).json({success:false,message:"All fields are required"});
    }

    const playerStats = computePlayerStats(totalRuns,ballsFaced,inningsPlayed,wickets,oversBalled,runsConceded);

    const {
        battingStrikeRate,
        battingAverage,
        bowlingStrikeRate,
        economyRate,
        playerPoints,
        playerValue,
    } = playerStats;

    

    try {
        const player = new playerModel({
            name,
            university,
            catogary,
            totalRuns,
            ballsFaced,
            inningsPlayed,
            wickets,
            oversBalled,
            runsConceded,
            battingStrikeRate,
            battingAverage,
            bowlingStrikeRate,
            economyRate,
            playerPoints,
            playerValue,
        });

        await player.save();
        return res.json({success:true});

    } catch (error) {
        return res.json({success:false,message:err.message})
    }

}