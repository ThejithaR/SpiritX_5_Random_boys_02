import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import NavBar from "../components/Navbar.jsx";

const TournamentSummary = () => {
  const { backendUrl } = useContext(AppContext);
  const [playersOrderRuns, setPlayersOrderRuns] = useState([]);
  const [playersOrderWickets, setPlayersOrderWickets] = useState([]);
  const [totalOverallRuns, setTotalOverallRuns] = useState(0);
  const [totalOverallWickets, setTotalOverallWickets] = useState(0);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/player/fetch-players"
        );
        if (data.success) {
          setTotalOverallRuns(
            data.players.reduce((sum, player) => sum + player.totalRuns, 0)
          );
          setTotalOverallWickets(
            data.players.reduce((sum, player) => sum + player.wickets, 0)
          );
          setPlayersOrderRuns(
            [...data.players].sort((a, b) => b.totalRuns - a.totalRuns)
          );
          setPlayersOrderWickets(
            [...data.players].sort((a, b) => b.wickets - a.wickets)
          );
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        toast.error("Error fetching players data");
      }
    };
    getPlayers();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-r from-gray-600 via-gray-400 to-gray-300 overflow-y-scroll">
      <NavBar />
      <h1 className="text-4xl font-bold text-gray-800 m-2 ml-5 mt-30 text-center">
        Tournament Summary
      </h1>
      <div className="w-full h-full flex flex-row justify-between p-5 gap-5 rounded-xl">
        <div className="flex-1 flex flex-col gap-5 bg-gray-700 text-white p-10 rounded-lg relative">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Highest Run Scorer :
            </h1>
            {playersOrderRuns.length === 0 ? (
              <p className="text-gray-300">No players found</p>
            ) : (
              <div>
                <h1 className="text-xl font-bold">
                  {playersOrderRuns[0].name}
                </h1>
                <p className="text text-gray-300">
                  {playersOrderRuns[0].university}
                </p>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar gap-5 p-5">
            {playersOrderRuns.map((player, index) => (
              <div
                key={index}
                className={`flex flex-row justify-between items-center p-5 rounded-lg transition-all 
                  ${
                    index === 0
                      ? "bg-gradient-to-r from-gray-500 to-gray-700 text-white text-xl font-extrabold shadow-lg shadow-gray-900 border-2 border-gray-400 p-6 scale-103"
                      : "bg-gray-800 text-gray-300 font-semibold text-lg"
                  }`}
              >
                <div className="flex flex-col gap-1">
                  <p>{player.name}</p>
                  <p className="text-sm text-gray-300">{player.university}</p>
                </div>
                <p>{player.totalRuns}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-5 px-20 rounded-lg text-xl font-bold">
            <p>Total Runs:</p>
            <p>{totalOverallRuns}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5 bg-gray-700 text-white p-10 rounded-lg relative">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Highest Wicket Taker :
            </h1>
            {playersOrderRuns.length === 0 ? (
              <p className="text-gray-300">No players found</p>
            ) : (
              <div>
                <h1 className="text-xl font-bold">
                  {playersOrderWickets[0].name}
                </h1>
                <p className="text text-gray-300">
                  {playersOrderWickets[0].university}
                </p>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar gap-5 p-5">
            {playersOrderWickets.map((player, index) => (
              <div
                key={index}
                className={`flex flex-row justify-between items-center p-5 rounded-lg transition-all 
                  ${
                    index === 0
                      ? "bg-gradient-to-r from-gray-500 to-gray-700 text-white text-xl font-extrabold shadow-lg shadow-gray-900 border-2 border-gray-400 p-6 scale-103"
                      : "bg-gray-800 text-gray-300 font-semibold text-lg"
                  }`}
              >
                <div className="flex flex-col gap-1">
                  <p>{player.name}</p>
                  <p className="text-sm text-gray-300">{player.university}</p>
                </div>
                <p>{player.wickets}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-5 px-20 rounded-lg text-xl font-bold">
            <p>Total Wickets:</p>
            <p>{totalOverallWickets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;
