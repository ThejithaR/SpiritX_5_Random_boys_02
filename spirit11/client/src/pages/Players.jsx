import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import PlayerCard from "../components/PlayerCard";
import { assets } from "../assets/assets";
import NavBar from "../components/Navbar.jsx";
import SpiritButton from "../components/SpiritButton.jsx";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("totalRuns"); // Default sorting by total runs
  axios.defaults.withCredentials = true;
  const { backendUrl } = useContext(AppContext);

  const fetchPlayers = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/player/fetch-players");

      if (data.success) {
        setPlayers(data.players);
      } else {
        toast.error("Player fetching failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Filter players by selected category
  const filteredPlayers = selectedCategory === "All"
    ? players
    : players.filter(player => player.category === selectedCategory);

  // Sort players based on selected criteria
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return -1;
    if (a[sortBy] < b[sortBy]) return 1;
    return 0;
  });

  return (
    <div className="p-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 min-h-screen">
      <NavBar />
      <SpiritButton />
      {/* Plaers list + Image */}
      <div className="flex items-center justify-center  mb-6 space-x-4 mt-30">
          <h1 className="text-3xl font-bold text-gray-900">Players List</h1>
          <img 
            src={assets.player_img} 
            alt="Player" 
            className="w-12 h-12 rounded-full shadow-black object-cover"
          />
       </div>


      {/* Category Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md cursor-pointer ${selectedCategory === "All" ? "bg-blue-500 text-white" : "bg-gray-300 "}`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md cursor-pointer ${selectedCategory === "Batsman" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedCategory("Batsman")}
        >
          Batsman
        </button>
        <button
          className={`px-4 py-2 rounded-md cursor-pointer  ${selectedCategory === "Bowler" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedCategory("Bowler")}
        >
          Bowler
        </button>
        <button
          className={`px-4 py-2 rounded-md cursor-pointer ${selectedCategory === "All-Rounder" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedCategory("All-Rounder")}
        >
          All-Rounder
        </button>
      </div>

      {/* Sorting Options */}
      <div className="flex justify-end items-center space-x-4 mb-6">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              className="px-4 py-2 rounded-md border cursor-pointer border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="totalRuns">Total Runs</option>
              <option value="wickets">Wickets</option>
              <option value="inningsPlayed">Innings Played</option>
              <option value="oversBowled">Overs Bowled</option>
              <option value="battingStrikeRate">Batting Strike Rate</option>
              <option value="bowlingStrikeRate">Bowling Strike Rate</option>
              <option value="economyRate">Economy Rate</option>
              <option value="playerPoints">Player Points</option>
              <option value="playerValue">Player Value</option>
            </select>
       </div>

      {/* Displaying sorted players */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedPlayers.map((player) => (
          <PlayerCard key={player._id} player={player} refreshPlayers={fetchPlayers} />
        ))}
      </div>
    </div>
  );
};

export default Players;
