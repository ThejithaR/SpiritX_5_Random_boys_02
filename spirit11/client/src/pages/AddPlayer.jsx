import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import NavBar from "../components/Navbar";

const AddPlayer = () => {
  const { backendUrl } = useContext(AppContext);

  const [player, setPlayer] = useState({
    name: "",
    university: "",
    category: "",
    totalRuns: 0,
    ballsFaced: 0,
    inningsPlayed: 0,
    wickets: 0,
    oversBowled: 0,
    runsConceded: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]:
        name === "name" || name === "university" || name === "category"
          ? value // Keep text fields as strings
          : value === ""
          ? 0
          : parseFloat(value), // Convert number fields properly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validation: Ensure all fields are filled
    for (const key in player) {
      if (
        (typeof player[key] === "string" && player[key].trim() === "") || // Empty string validation
        (typeof player[key] === "number" && isNaN(player[key])) // NaN validation
      ) {
        toast.error(`Please fill in the ${key.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/player/add-player`, {
        player,
      });
      if (data.success) {
        toast.success("Player added successfully");

        // Reset Form
        setPlayer({
          name: "",
          university: "",
          category: "",
          totalRuns: 0,
          ballsFaced: 0,
          inningsPlayed: 0,
          wickets: 0,
          oversBowled: 0,
          runsConceded: 0,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error adding player");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 p-6">
      <NavBar />
      <div className="w-full mt-30 max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Player
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {Object.keys(player).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={typeof player[key] === "number" ? "number" : "text"}
                name={key}
                //value={player[key]}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
          ))}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
