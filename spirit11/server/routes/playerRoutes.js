import express , { Router } from 'express'
import {addPlayer} from '../controllers/playerController.js'

const playerRouter = Router();

playerRouter.post('/add-player',addPlayer)

export default playerRouter;
// Compare this snippet from spirit11/server/routes/playerRoutes.js: