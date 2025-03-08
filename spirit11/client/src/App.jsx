import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import './App.css'

import Home from "./Pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Spiriter from "./Pages/Spiriter";
import TeamAndSelection from "./pages/TeamAndSelection";
import Players from "./pages/Players";
import Budget from "./pages/Budget";
import Leaderboard from "./pages/Leaderboard";
import TournamentSummary from "./pages/TournamentSummary";
import AddPlayer from "./pages/addPlayer";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/spiriter" element={<Spiriter />} />
        <Route path="/teamandselection" element={<TeamAndSelection />} />
        <Route path="/players" element={<Players />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/tournament-summary" element={<TournamentSummary />} />
        <Route path="/add-player" element={<AddPlayer />} />

      </Routes>
    </div>
  );
};

export default App;
