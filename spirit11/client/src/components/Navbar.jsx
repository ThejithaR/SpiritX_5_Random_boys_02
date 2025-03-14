import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SpiritButton from "./SpiritButton.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, setUserData, setIsLoggedin, isLoggedin } =
    useContext(AppContext);
  const isHomePage = location.pathname === "/";
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      localStorage.removeItem('token');
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleClick = () => {
    if (userData.role === "admin" && isLoggedin) {
      navigate("/dashboard");
    } else if (userData.role === "user" && isLoggedin) {
      navigate("/players");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        src={assets.logo}
        alt=""
        className="w-15 sm:w-15 h-16 rounded-full"
        onClick={handleClick}
      />
      {/* Navbar Links */}
      {userData.role === "user" && !isHomePage && (
        <div className="hidden sm:flex gap-6 items-center justify-center">
          <p
            className="text-gray-800 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p
            className="text-gray-800 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/players")}
          >
            Players
          </p>
          <p
            className="text-gray-800 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/teamandselection")}
          >
            TeamSelection
          </p>
          <p
            className="text-gray-800 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/budget")}
          >
            Budget
          </p>
          <p
            className="text-gray-800 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </p>
          {/* <p
            className="text-gray-800 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/Spiriter")}
          >
            Spiriter
          </p> */}
          <SpiritButton />
        </div>
      )}

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.username[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify email
                </li>
              )}
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Signup
          <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default NavBar;
