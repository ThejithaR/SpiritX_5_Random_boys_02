import React , { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';  // Import useHistory from react-router-dom

const PlayerStatCard = ({player}) => {
    
    const [playerStats, setPlayerStats] = useState(player);

    useEffect(() => {
        setPlayerStats(player);
    }, [player]);

    // Function to go back to the previous page
    const goBack = () => {
        // history.goBack();  // Navigates to the previous page in the history stack
    };



    return (
        <div className="w-7/8 h-7/8 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 animate-gradient shadow-2xl p-[4px] relative">
            
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 opacity-50 blur-lg animate-pulse rounded-xl"></div>

            {/* Inner Container */}
            <div className="relative w-[calc(100%-20px)] h-[calc(100%-20px)] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-xl flex flex-row shadow-xl border border-blue-400/50">
                
                {/* Left Section - Player Image & Info */}
                <div className="flex-2 flex flex-col items-center justify-center gap-5 p-5">
                    
                    {/* Metallic Frame for Image */}
                    <div className="p-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg flex items-center justify-center shadow-lg border border-blue-500/40">
                        <img 
                            src='https://cdn.vectorstock.com/i/1000v/56/97/cricket-batsman-sport-player-action-cartoon-vector-27865697.jpg'
                            alt="Player"  
                            className="w-40 h-40 object-cover rounded-lg shadow-md"
                        />
                        {/* <p>{JSON.stringify(playerStats)}</p> */}
                    </div>
                    <div className="text-center flex flex-col items-center justify-center">
                        <input
                            type="text"
                            value={player.name}
                            className="text-3xl font-extrabold text-white drop-shadow-md bg-transparent border-none focus:ring-0 text-center"
                            readOnly
                        />
                        <input
                            type="text"
                            value={player.university}
                            className="text-lg text-blue-300 bg-transparent border-none focus:ring-0 text-center"
                            readOnly
                        />
                    </div>
                </div>

                                    {/* Right Section - Player Stats */}
                <div className="flex-3 flex flex-col justify-center gap-6 p-5">
                    {/* Stats in a 2-column layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Category</label>
                            <input
                                type="text"
                                value={player.category}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Total Runs</label>
                            <input
                                type="number"
                                value={player.totalRuns}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Balls Faced</label>
                            <input
                                type="number"
                                value={player.ballsFaced}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Innings Played</label>
                            <input
                                type="number"
                                value={player.inningsPlayed}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Wickets</label>
                            <input
                                type="number"
                                value={player.wickets}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Overs Bowled</label>
                            <input
                                type="number"
                                value={player.oversBowled}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Runs Conceded</label>
                            <input
                                type="number"
                                value={player.runsConceded}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Batting Strike Rate</label>
                            <input
                                type="text"
                                value={player.battingStrikeRate}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Batting Average</label>
                            <input
                                type="text"
                                value= {player.battingAverage}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-lg text-blue-200 font-medium">Bowling Strike Rate</label>
                            <input
                                type="text"
                                value={player.bowlingStrikeRate}
                                className="text-xl font-semibold text-white bg-transparent border-none focus:ring-0"
                                readOnly
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Back Button Inside the Div */}
            <div className="absolute top-8 left-8">
                <button 
                    onClick={goBack} 
                    className="p-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    ← Back
                </button>
            </div>
        </div>
    );
}

export default PlayerStatCard;
