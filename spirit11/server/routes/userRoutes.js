import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData, fetchTeam, undoPurchase} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/data",userAuth,getUserData)
userRouter.get("/fetch-team", userAuth, fetchTeam)
userRouter.post("/undo-purchase", userAuth, undoPurchase)


export default userRouter;