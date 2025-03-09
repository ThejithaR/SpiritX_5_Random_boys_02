import React, { useState,useContext } from "react";
import axios from "axios";
import Modal from "../components/PlayerModals";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const PlayerCard = ({ player, refreshPlayers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {role} = useContext(AppContext);
  console.log(role)
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; 
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${player.name}?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const { data } = await axios.delete(`http://localhost:5000/api/player/delete/${player._id}`);

      if (data.success) {
        toast.success("Player deleted successfully");
        refreshPlayers(); // Refresh the player list
      } else {
        toast.error("Failed to delete player");
      }
    } catch (error) {
      toast.error("Error deleting player: " + error.message);
    } finally {
      setIsDeleting(false);
    }
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

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={openModal}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                View Profile
              </button>
            
             { role==='admin'&&
                <button
                onClick={handleDelete}
                className={`px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors ${
                isDeleting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={isDeleting}>
             {isDeleting ? "Deleting..." : "Delete"}
           </button>
             }   
              
            </div>
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
