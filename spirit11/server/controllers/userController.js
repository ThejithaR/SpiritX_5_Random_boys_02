import userModel from "../models/userModel.js"
import {getPlayersByIDs} from "../services/playerServices.js"

export const getUserData = async(req,res)=>{
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        res.json({
            success:true,
            userData:{
                username:user.username,
                isAccountVerified:user.isAccountVerified,      
            }
        })
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

export const fetchTeam = async(req,res)=>{
    try {
        const {userId} = req.body;  
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        const team = user.team;
        const budget = user.budget;
        //console.log(team);

        const players = await getPlayersByIDs({playerIds:team});
        console.log(players);
        res.json({success:true, players, budget})

    }
    catch(err){
        return res.json({success:false,message:err.message})
    }
}