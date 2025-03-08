import React, { useState } from "react";
import { toast } from "react-toastify";

const AddPlayer = () => {
  const [player, setPlayer] = useState({
    name: "",
    university: "",
    catogary: "",
    totalRuns: 0,
    ballsFaced: 0,
    inningsPlayed: 0,
    wickets: 0,
    oversBalled: 0,
    runsConceded: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    //Backend eka call karanna
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/player/add-player", {
        player,
      });
      if (data.success) {
        toast.success("Player added successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      {Object.keys(player).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {key}
          </label>
          <input
            type="text"
            name={key}
            value={player[key]}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Player
      </button>
    </form>
  );
};

export default AddPlayer;
