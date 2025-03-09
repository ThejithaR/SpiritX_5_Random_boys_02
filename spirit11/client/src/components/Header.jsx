import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const { userData, isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if(!isLoggedin) navigate("/login");
    else if (userData.role === "admin" && isLoggedin) navigate("/dashboard");
    else navigate("/leaderboard");
  }
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800 bg-gr">
      <img
        src={assets.cricket_gif}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.username : "Crickerters"}!
        <img src={assets.
          hand_wave
        } alt="" className="w-8 aspect-square" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to Spirit11!
      </h2>
      <p className="text-1xl sm:text-2xl mb-4">
        Build Your Dream Team, Dominate the Game!
      </p>

      <button
        onClick={handleClick}
        className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
