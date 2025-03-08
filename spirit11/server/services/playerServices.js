const computeBattingStrikeRate = (totalRuns , totalBallsFaced) => {
    if(totalBallsFaced === 0){
        return 0;
    }
    return (totalRuns / totalBallsFaced) * 100;
}

const computeBattingAverage = (totalRuns , inningsPlayed) => {
    if(inningsPlayed === 0){
        return 0;
    }
    return (totalRuns / inningsPlayed);
}
const computeBowlingStrikeRate = (totalBallsFaced , totalWickets) => {
    if(totalWickets === 0){
        return 0;
    }
    return (totalBallsFaced / totalWickets);
}
const computeEconomyRate = (totalBallsBowled , totalRunsConceded) => {
    if(totalBallsBowled === 0){
        return 0;
    }
    return (totalRunsConceded / totalBallsBowled) * 6;
}

export const computePlayerStats = ( totalRuns , totalBallsFaced,inningsPlayed,totalWickets,totalBallsBowled,totalRunsConceded) => {
    const battingStrikeRate = computeBattingStrikeRate(totalRuns , totalBallsFaced);
    const battingAverage = computeBattingAverage(totalRuns , inningsPlayed);
    const bowlingStrikeRate = computeBowlingStrikeRate(totalBallsFaced , totalWickets);
    const economyRate = computeEconomyRate(totalBallsBowled , totalRunsConceded);

    const playerPoint = (battingStrikeRate/5) + (battingAverage*0.8) + (500/bowlingStrikeRate) + (140/economyRate);
    const playerValue = (9*playerPoint + 100) * 1000;

    return { battingStrikeRate , battingAverage , bowlingStrikeRate , economyRate , playerPoint , playerValue};
}
