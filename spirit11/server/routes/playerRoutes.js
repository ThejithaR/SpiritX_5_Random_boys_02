import { Router } from "express";
import {
  addPlayer,
  fetchPlayers,
  searchPlayers,
  deleteByID
} from "../controllers/playerController.js";
import { getPlayers } from "../controllers/playerController.js";
import { getPlayerById } from "../controllers/playerController.js";

const playerRouter = Router();


playerRouter.delete('/delete',deleteByID)
playerRouter.post('/add-player', addPlayer)
playerRouter.get('/get-players', getPlayers)
playerRouter.get('/fetch-players',fetchPlayers)
playerRouter.post('/search-Players', searchPlayers)
playerRouter.get('/get-player-by-id/:id',getPlayerById)

export default playerRouter;
