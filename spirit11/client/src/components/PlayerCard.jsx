import React, { useState } from "react";
import Modal from "../components/PlayerModals";
import { motion, AnimatePresence } from "framer-motion";

const PlayerCard = ({ player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; 
  };

  return (
    <div>
      {/* Player Card with Animation */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-blue-600">{player.name}</h3>
            <p className="text-gray-600 mt-1">{player.university}</p>

            {/* Player Stats */}
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">Total Runs: <span className="font-bold">{player.totalRuns}</span></p>
              <p className="text-gray-700">Wickets: <span className="font-bold">{player.wickets}</span></p>
              <p className="text-gray-700">Innings Played: <span className="font-bold">{player.inningsPlayed}</span></p>
              <p className="text-gray-700">Batting Strike Rate: <span className="font-bold">{Number(player.battingStrikeRate).toFixed(3)}</span></p>
            </div>

            {/* Action Button */}
            <button
              onClick={openModal}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              View Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal with Animation */}
      <AnimatePresence>
        {isModalOpen && <Modal player={player} closeModal={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default PlayerCard;
