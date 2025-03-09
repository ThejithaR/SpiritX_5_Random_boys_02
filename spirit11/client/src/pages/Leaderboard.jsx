import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Leaderboard = () => {
  const [filter, setFilter] = useState(5);
  const [playersData, setPlayersData] = useState([]);

  const { backendUrl } = useContext(AppContext);
  useEffect(() => {
    const getPlayers = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/player/get-players"
        );
        if (data.success) {
          console.log(data.players)
          setPlayersData(data.players);
        } else {
          toast.error(data.message);
          ``;
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        toast.error("Error fetching players data");
      }
    };
    getPlayers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <div className="mb-4">
        <label className="mr-2">Show top:</label>
        <input
          type="number"
          min="1"
          max={playersData.length} 
          value={filter}
          onChange={(e) => setFilter(Number(e.target.value))} // Update filter state on input change
          className="p-1 text-black rounded"
        />
      </div>
      <div className="w-full max-w-md">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-2">Name</th>
              <th className="border border-gray-700 p-2">Player Points</th>
            </tr>
          </thead>
          <tbody>
            {playersData.slice(0, filter).map((player, index) => (
              <tr key={index} className="odd:bg-gray-700 even:bg-gray-800">
                <td className="border border-gray-700 p-2 text-left">
                  {player.name}
                </td>
                <td className="border border-gray-700 p-2 text-left">
                  {Number(player.playerPoints).toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
