import { Router } from 'express'
import {addPlayer,getPlayers} from '../controllers/playerController.js'

const playerRouter = Router();

playerRouter.post('/add-player',addPlayer)
playerRouter.get('/get-players',getPlayers)


export default playerRouter;
// Compare this snippet from spirit11/server/routes/playerRoutes.js:

