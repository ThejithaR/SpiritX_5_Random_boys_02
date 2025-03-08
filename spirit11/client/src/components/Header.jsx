import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";


const Header = () => {
  const {userData} = useContext(AppContext);
  return (
      <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800 bg-gr">
          
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
          />
          
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.username : 'Developer'}!
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
          </h1>
          
          <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to SecureConnect!</h2>
          <h4 className="text-2xl sm:text-4xl font-semibold mb-4">A secure and user-friendly authentication system</h4>
          <h4 className="text-2xl sm:text-4xl font-semibold mb-4">for your web applications</h4>
          
    </div>
  );
};

export default Header;
