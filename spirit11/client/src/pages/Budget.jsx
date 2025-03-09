import React, { useState, useEffect, useContext} from "react";
import { AppContext } from "../context/AppContext";
import {toast} from "react-toastify";
import PlayerCard from "../components/PlayerCardForBudget";
import axios from "axios";

const Budget = () => {
  const {backendUrl,isLoggedin , userData, getUserData} = useContext(AppContext)
  const [budget, setBudget] = useState(500000); // Example budget
  const [players, setPlayers] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Placeholder for API call to fetch user-owned players
    const fetchPlayers = async () => {
      try {
        const response = await axios.post(backendUrl + "/api/user/fetch-team", ); // Replace with actual API URL
        const fetchedPlayers = response.data;

        setPlayers(fetchedPlayers);

        // Calculate total value of owned players
        const total = fetchedPlayers.reduce((sum, player) => sum + player.value, 0);
        setTotalValue(total);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-white">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">🏏 Budget Overview</h1>

      {/* Budget Balance */}
      <div className="text-center text-green-400 text-2xl font-semibold bg-green-900 p-3 rounded-lg w-fit mx-auto shadow-md">
        Current Balance: Rs {budget.toLocaleString()}
      </div>

      {/* Table Header */}
      <div className="flex justify-between bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg mt-6">
        <span>Name</span>
        <span>University</span>
        <span>Category</span>
        <span>Value (Rs)</span>
      </div>

      {/* Player Cards */}
      <div className="space-y-2 mt-2">
        {players.length > 0 ? (
          players.map((player, index) => <PlayerCard key={index} {...player} />)
        ) : (
          <p className="text-center text-gray-300 mt-4">No players owned yet.</p>
        )}
      </div>

      {/* Total Players' Value */}
      <div className="text-center text-red-400 text-2xl font-semibold bg-red-900 p-3 rounded-lg w-fit mx-auto shadow-md mt-6">
        Total Value: Rs {totalValue.toLocaleString()}
      </div>
    </div>
  );
};

export default Budget;
