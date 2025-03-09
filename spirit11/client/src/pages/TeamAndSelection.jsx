import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import PlayerCardForMyTeam from "../components/PlayerCardForBudget";
import axios from "axios";
import NavBar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TeamAndSelection = () => {
  const { backendUrl } = useContext(AppContext);
  const [view, setView] = useState("team"); // "selection" or "team"
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if (searchTerm === "") {
          const response = await axios.get(
            backendUrl + "/api/player/get-players"
          );
          console.log("NO SEARCH TERM", response.data);
          setPlayers(response.data);
        } else {
          const response = await axios.post(
            backendUrl + "/api/player/searchPlayers",
            searchTerm
          );
          setPlayers(response.data.players);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/fetch-team`);
        setTeam(response.data.players);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchPlayers();
    fetchTeam();
  }, []);

  const handleUndoPurchase = async (player) => {
    const confirmUndo = window.confirm(`Undo purchase of ${player.name}?`);
    if (confirmUndo) {
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/undo-purchase`, {
          playerId: player._id,
        });
        if (data.success) {
          toast.success(data.message);
         window.location.reload();

        }
      } catch (error) {
        console.error("Error undoing purchase:", error);
      }
    }
  };

  const handleView = async (player) => {
    navigate(`/player-stat/${player._id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-white">
      <NavBar />
      <h1 className="text-3xl font-bold text-center mb-6 mt-30">
        🏏 Player Selection & My Team
      </h1>

      {/* Tabs for Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setView("selection")}
          className={`px-6 py-2 font-semibold rounded-md transition ${
            view === "selection"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 hover:bg-gray-400"
          }`}
        >
          Player Selection
        </button>
        <button
          onClick={() => setView("team")}
          className={`px-6 py-2 font-semibold rounded-md transition ${
            view === "team"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 hover:bg-gray-400"
          }`}
        >
          My Team
        </button>
      </div>

      {view === "selection" && (
        <div className="w-full p-4">
          <input
            type="text"
            placeholder="Search players..."
            className="w-full p-3 rounded-md bg-gray-100 text-black focus:ring-2 focus:ring-blue-500"
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
            {players.length > 0 ? (
              players.map((player) => (
                <div key={player._id} className="mb-2">
                  <PlayerCardForBudget {...player} />
                  <button
                    onClick={() => handlePurchase(player)}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Buy
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300 mt-4">
                No players available.
              </p>
            )}
          </div>
        </div>
      )}

      {view === "team" && (
        <div className="w-full p-4">
          {team.length > 0 ? (
            <div className="">
              {team.map((player) => (
                <div
                  key={player._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg w-full mb-5"
                >
                  <PlayerCardForMyTeam {...player} />
                  <button
                    onClick={() => handleUndoPurchase(player)}
                    className="w-40 mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md"
                  >
                    Undo Purchase
                  </button>
                  <button
                    onClick={() => handleView(player)}
                    className="w-40 mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md ml-5"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-6">
              No players owned yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamAndSelection;
