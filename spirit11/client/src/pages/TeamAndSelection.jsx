import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import PlayerCardForBudget from "../components/PlayerCardForBudget";
import axios from "axios";
import { motion } from "framer-motion";

const TeamAndSelection = () => {
  const { backendUrl } = useContext(AppContext);
  const [view, setView] = useState("selection"); // "selection" or "team"
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if(searchTerm === "") {
        const response = await axios.get(backendUrl + '/api/player/get-players');
        console.log("NO SEARCH TERM",response.data);
        setPlayers(response.data);
        }
        else {
          const response = await axios.post(backendUrl + '/api/player/searchPlayers' , searchTerm);
          setPlayers(response.data.players);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    
    const fetchTeam = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/user/fetch-team');
        setTeam(response.data.players);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchPlayers();
    fetchTeam();
  }, [backendUrl]);

  const handlePurchase = async (player) => {
    const confirmPurchase = window.confirm(`Buy ${player.name} for Rs ${player.value}?`);
    if (confirmPurchase) {
      try {
        await axios.post(backendUrl + '/api/user/buy-player', { playerId: player._id });
        setTeam([...team, player]);
      } catch (error) {
        console.error("Error purchasing player:", error);
      }
    }
  };

  const handleUndoPurchase = async (player) => {
    const confirmUndo = window.confirm(`Undo purchase of ${player.name}?`);
    if (confirmUndo) {
      try {
        await axios.post(backendUrl + 'api/user/undo-purchase', { playerId: player._id });
        setTeam(team.filter(p => p._id !== player._id));
      } catch (error) {
        console.error("Error undoing purchase:", error);
      }
    }
  };




  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-white">
      <h1 className="text-6xl font-bold text-center mb-6">🏏 Player Selection</h1>

      {/* Slider */}
      <div className="flex justify-center mb-4">
        <button onClick={() => setView("selection")} className={`px-4 py-2 mx-2 rounded ${view === "selection" ? "bg-black" : "bg-gray-700"}`}>
          Player Selection
        </button>
        <button onClick={() => setView("team")} className={`px-4 py-2 mx-2 rounded ${view === "team" ? "bg-black" : "bg-gray-700"}`}>
          My Team
        </button>
      </div>

      <motion.div animate={{ x: view === "selection" ? 0 : "-100%" }} transition={{ duration: 0.5 }} className="flex w-[200%]">
        {/* Player Selection View */}
        <div className="w-1/2 p-4">
          <input
            type="text"
            placeholder="Search players..."
            className="w-full p-2 rounded bg-gray-100 text-black mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <div>
            {players.filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase())).map(player => (
              <div key={player._id} className="mb-2">
                <PlayerCardForBudget {...player} />
                <button 
                  onClick={() => handlePurchase(player)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                  Buy
                </button>
              </div>
            ))}
          </div> */}

          <div>
            {players.length > 0 ? players.map(player => (
              <div key={player._id} className="mb-2">
                <PlayerCardForBudget {...player} />
                <button 
                  onClick={() => handlePurchase(player)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                  Buy
                </button>
              </div>
            )) : <p className="text-center text-gray-300 mt-4">No players available.</p>}
          </div>

        </div>

        {/* My Team View */}
        <div className="w-1/2 p-4">
          {team.length > 0 ? team.map(player => (
            <div key={player._id} className="mb-2">
              <PlayerCardForBudget {...player} />
              <button 
                onClick={() => handleUndoPurchase(player)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                Undo Purchase
              </button>
            </div>
          )) : <p className="text-center text-gray-300 mt-4">No players owned yet.</p>}
        </div>
      </motion.div>
    </div>
  );
};

export default TeamAndSelection;
