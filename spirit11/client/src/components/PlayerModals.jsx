import React from "react";
import { motion } from "framer-motion";

const Modal = ({ player, closeModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
      {/* Background blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 min-h-screen backdrop-blur-sm"></div>

      {/* Modal content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl relative z-10 overflow-y-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-center w-full">{player.name} - Profile</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
          >
            &times;
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Player Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Player Details</h3>
            <p className="text-gray-700">University: <span className="font-bold">{player.university}</span></p>
            <p className="text-gray-700">Category: <span className="font-bold">{player.category}</span></p>
            <p className="text-gray-700">Player Value: <span className="font-bold">{player.playerValue} Rs</span></p>
          </div>

          {/* Batting Stats */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Batting Stats</h3>
            <p className="text-gray-700">Total Runs: <span className="font-bold">{player.totalRuns}</span></p>
            <p className="text-gray-700">Balls Faced: <span className="font-bold">{player.ballsFaced}</span></p>
            <p className="text-gray-700">Batting Strike Rate: <span className="font-bold">{player.battingStrikeRate}</span></p>
            <p className="text-gray-700">Batting Average: <span className="font-bold">{player.battingAverage}</span></p>
          </div>

          {/* Bowling Stats */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Bowling Stats</h3>
            <p className="text-gray-700">Wickets: <span className="font-bold">{player.wickets}</span></p>
            <p className="text-gray-700">Innings Played: <span className="font-bold">{player.inningsPlayed}</span></p>
            <p className="text-gray-700">Overs Bowled: <span className="font-bold">{player.oversBowled}</span></p>
            <p className="text-gray-700">Runs Conceded: <span className="font-bold">{player.runsConceded}</span></p>
            <p className="text-gray-700">Bowling Strike Rate: <span className="font-bold">{player.bowlingStrikeRate}</span></p>
            <p className="text-gray-700">Economy Rate: <span className="font-bold">{player.economyRate}</span></p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
