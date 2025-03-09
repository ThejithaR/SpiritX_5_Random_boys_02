import userModel from "../models/userModel.js"

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

    }
    catch(err){
        return res.json({success:false,message:err.message})
    }
}