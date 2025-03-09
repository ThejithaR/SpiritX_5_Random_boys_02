import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import PlayerCardForMyTeam from "../components/PlayerCardForBudget";
import PlayerCardForBudget from "../components/PlayerCardForBudget";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TeamAndSelection = () => {
  const { backendUrl } = useContext(AppContext);
  const [view, setView] = useState("team"); // "selection" or "team"
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [noOfPlayers, setNoOfPlayers] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if (searchTerm === "") {
          const response_normal = await axios.get(
            backendUrl + "/api/player/fetch-players"
          );
          console.log("NO SEARCH TERM", response_normal.data);
          setPlayers(response_normal.data.players);
        } else {
          const response_search = await axios.post(
            backendUrl + "/api/player/search-Players",
            { searchTerm }
          );
          console.log("WITH SEARCH TERM", searchTerm, response_search.data);
          setPlayers(response_search.data.players);
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

    const fetchNoOfPlayers = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/user/fetch-no-of-players`
        );
        console.log(data);
        setNoOfPlayers(data.noOfPlayers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayers();
    fetchTeam();
    fetchNoOfPlayers();
  }, [backendUrl, searchTerm]);

  const handleUndoPurchase = async (player) => {
    const confirmUndo = window.confirm(`Undo purchase of ${player.name}?`);
    if (confirmUndo) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/undo-purchase`,
          {
            playerId: player._id,
          }
        );
        if (data.success) {
          toast.success(data.message);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error undoing purchase:", error);
      }
    }
  };

  const handlePurchase = async (player) => {
    //const confirmPurchase = window.confirm(`Purchase ${player.name}?`);
    try {
      const res = await axios.post(backendUrl + "/api/user/buy-player", {
        playerId: player._id,

      });
      //alert("Player Purchased Successfully");
      if (res.data.success) {
        toast.success(res.data.message);
        setNoOfPlayers(noOfPlayers + 1);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error purchasing player:", error);
    }
  };

  const handleView = async (player) => {
    navigate(`/player-stat/${player._id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-white">
      <Navbar />
      <h1 className="text-5xl font-bold text-center mb-6 mt-30 p-4">
        🏏 Player Selection & My Team
      </h1>

      {/* Tabs for Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => {
            setView("team");
            window.location.reload();
          }}
          className={`px-6 py-2 font-semibold rounded-full transition ${
            view === "team"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 hover:bg-gray-400"
          }`}
        >
          My Team
        </button>
        <button
          onClick={() => setView("selection")}
          className={`px-6 py-2 font-semibold rounded-full transition ${
            view === "selection"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 hover:bg-gray-400"
          }`}
        >
          Player Selection
        </button>

        <label className="m-3 bg-gray-500px-6 py-2 font-semibold rounded-md text-xl">
          Players Selected :
        </label>
        <label className="m-3 bg-gray-500px-6 py-2 font-bold rounded-md text-gray-900 text-xl">
          {noOfPlayers} / 11
        </label>
      </div>

      {view === "selection" && (
        <div className="w-full p-4">
          <div className="flex justify-center p-4">
            <input
              type="text"
              placeholder="Search players..."
              className="w-full max-w-md p-4 rounded-full bg-gray-100 text-black focus:ring-2 focus:ring-blue-500 ring-2 ring-gray-400 shadow-md 
               border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                <div
                  key={player._id}
                  className="mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-4 rounded-lg shadow-lg w-full justify-content-right transform transition-all duration-300 hover:scale-101 hover:ring-4 hover:ring-gray-600"
                >
                  <PlayerCardForBudget {...player} />
                  <div className="rounded-md flex justify-end pr-4">
                    <button
                      onClick={() => handleView(player)}
                      className="w-40 mt-3 bg-white hover:bg-white-600 text-black font-bold py-2 rounded-full mr-5"
                      >
                      View
                    </button>

                    <button
                      onClick={() => handlePurchase(player)}
                      className="bg-green-500 text-white px-4 py-2 rounded-full mt-2 flex w-40 text-center flex justify-center items-center"
                    >
                      Buy
                    </button>
                  </div>
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
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleView(player)}
                      className="w-40 mt-3 bg-white hover:bg-white-600 text-black font-bold py-2 rounded-full mr-5"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUndoPurchase(player)}
                      className="w-40 mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full"
                    >
                      Undo Purchase
                    </button>
                  </div>
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
