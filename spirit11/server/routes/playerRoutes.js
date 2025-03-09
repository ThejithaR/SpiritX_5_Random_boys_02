import { Router } from 'express'
import { addPlayer, fetchPlayers } from '../controllers/playerController.js'
import { getPlayers } from '../controllers/playerController.js'

const playerRouter = Router();

playerRouter.post('/add-player', addPlayer)
playerRouter.get('/get-players', getPlayers)
playerRouter.get('/fetch-players',fetchPlayers)

export default playerRouter;
