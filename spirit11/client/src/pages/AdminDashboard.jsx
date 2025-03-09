import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Card Data
  const adminOptions = [
    { title: "Player View", path: "/players", bg: "bg-blue-500" },
    { title: "Player Stats", path: "/player-stats", bg: "bg-green-500" },
    {
      title: "Tournament Summary",
      path: "/tournament-summary",
      bg: "bg-yellow-500",
    },
    { title: "Add Player", path: "/add-player", bg: "bg-red-500" },
  ];

    return (
        <div>
            <NavBar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 p-6">
          <div className="w-full max-w-4xl grid grid-cols-2 gap-6">
            {adminOptions.map((option, index) => (
              <div
                key={index}
                className={`p-8 ${option.bg} text-white font-bold text-xl rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center justify-center`}
                onClick={() => navigate(option.path)}
              >
                {option.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;
