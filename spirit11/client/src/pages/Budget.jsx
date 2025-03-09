import React, { useState, useEffect, useContext} from "react";
import { AppContext } from "../context/AppContext";
import {toast} from "react-toastify";
import PlayerCard from "../components/PlayerCardForBudget";
import axios from "axios";
import NavBar from "../components/Navbar";

//import { set } from "mongoose";

const Budget = () => {
  const {backendUrl,isLoggedin , userData, getUserData} = useContext(AppContext)
  const [budget, setBudget] = useState(0); // Example budget
  let [players, setPlayers] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {

    const fetchPlayers = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/user/fetch-team");
        const fetchedData = response.data;
        console.log("Response:", response.data);
        console.log("Fetched players:", fetchedData);
        const fetchedPlayers = fetchedData.players;
        setPlayers(fetchedPlayers);
        console.log("Players:",players);
        setBudget(response.data.budget);

        // Calculate total value of owned players
        const total = fetchedPlayers.reduce((sum, player) => sum + player.playerValue, 0);
        setTotalValue(total);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);



  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-white">
      <NavBar />
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 mt-30">🏏 Budget Overview</h1>

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
