import playerModel from "../models/playerModel.js";

const computeBattingStrikeRate = (totalRuns , totalBallsFaced) => {
    if(totalBallsFaced === 0){
        return 0;
    }
    return (totalRuns / totalBallsFaced) * 100;
};

const computeBattingAverage = (totalRuns , inningsPlayed) => {
    if(inningsPlayed === 0){
        return 0;
    }
    return (totalRuns / inningsPlayed);
};
const computeBowlingStrikeRate = (totalBallsBowled , totalWickets) => {
    if(totalWickets === 0){
        return 0;
    }
    return (totalBallsBowled / totalWickets);
};
const computeEconomyRate = (totalBallsBowled , totalRunsConceded) => {
    if(totalBallsBowled === 0){
        return 0;
    }
    return (totalRunsConceded / totalBallsBowled) * 6;
};

export const computePlayerStats = ( totalRuns , totalBallsFaced,inningsPlayed,totalWickets,oversBowled,totalRunsConceded) => {
    const battingStrikeRate = computeBattingStrikeRate(totalRuns , totalBallsFaced);
    const battingAverage = computeBattingAverage(totalRuns , inningsPlayed);
    const totalBallsBowled = oversBowled * 6;
    const bowlingStrikeRate = computeBowlingStrikeRate(totalBallsBowled , totalWickets);
    const economyRate = computeEconomyRate(totalBallsBowled , totalRunsConceded);

    const playerPoints = (battingStrikeRate/5) + (battingAverage*0.8) + (bowlingStrikeRate === 0 ? 0 : (500/bowlingStrikeRate)) + (economyRate === 0 ? 0 : (140/economyRate));

    const playerValue = Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;

    return { battingStrikeRate , battingAverage , bowlingStrikeRate , economyRate , playerPoints , playerValue};
};

export const getPlayersByIDs = async ({ playerIds }) => {
    try {
        const players = await playerModel.find({ _id: { $in: playerIds } });
        return players;
    } catch (err) {
        console.error("Error fetching players:", err);
        return [];
    }
};
