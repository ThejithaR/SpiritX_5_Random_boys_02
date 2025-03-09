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
                isAccountVerified: user.isAccountVerified, 
                role: user.role,
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

export const buyPlayer = async(req,res)=>{
    try{
        const {userId,playerId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        const player = await playerModel.findById(playerId);
        if(!player){
            return res.json({success:false,message:"Player not found!"})
        }
        if(user.budget < player.playerValue){
            return res.json({success:false,message:"Insufficient budget"})
        }
        user.budget -= player.value;
        user.team.push(playerId);
        await user.save();
        res.json({success:true,message:"Player added to team successfully"})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}