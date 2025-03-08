import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import transporter from '../config/nodeMailer.js'

export const register = async (req,res) =>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({success:false,message:"All fields are required"});
        
    }

    try{
        
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User Already Exists!"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = new userModel({username,email,password:hashedPassword});
        await user.save();
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge:7*24*60*60*1000
        });

        //sending welcome email
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject: 'Welcome to SecureConnect',
            text:`Welcome to SecureConnect.Your account has been created with email id:${email}`
        }
        await transporter.sendMail(mailOptions)
        
        return res.json({success:true})


    }catch(error){
        res.json({success:false,message:error.message})
    }
}

export const login =async (req,res) =>{
    const {username,password} = req.body;

    if(!username||!password){
        return res.status(400).json({success:false,message:"Username and password are required"});
    }
    try{
        const user = await userModel.findOne({username});
        
        if(!user){
            return res.json({success:false,message:'Invalid username'});
        }
        
        const isMatched = await bcrypt.compare(password,user.password)
        
        if(!isMatched){
            return res.json({success:false,message:'invalid password'})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge:7*24*60*60*1000
        });

        return res.json({success:true})


    }catch(error){
        return res.status(400).json({success:false,message:error.message});
        
    }
}

export const logout = async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        })
        return res.json({success:true,message:'Logged out'})

    }catch(error){
        return res.status(400).json({success:false,message:error.message});
    }
}

//send verification OTP to user email
export const sendVerifyOtp = async(req,res)=>{
    try{
        
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        
        if(user.isAccountVerified){
            return res.json({success:false,message:"Account is already verified"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000;

        await user.save();
        
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject: 'Account verification OTP',
            text:`Your otp is ${otp}. Verify your account using this OTP`
        }
        await transporter.sendMail(mailOptions);
        res.json({success:true,message:'Verification OTP Sent on Email '})

    }catch(err){
        res.json({success:false,message:err.message})
    }
}


export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.verifyOtp === '' || user.verifyOtp != otp) {
            return res.json({ success: false, message: 'Invalid OTP!' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired!' });
        }


        
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        
        await user.save(); 


        return res.json({ success: true, message: 'Email Verified successfully.' });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};


export const sendResetOtp = async (req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success:false,message:"Email is required"})
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 24*60*60*1000;

        await user.save();
        
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject: 'Account password reset OTP',
            text:`Your otp for reseting your password is ${otp}.Use this OTP to procedd with resetting your password`
        };
        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"OTP sent to your email"})


    }catch(err){
        return res.json({success:false,message:err.message})

    }
}



export const check_otp = async (req, res) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.resetOtp === '' || user.resetOtp != otp) {
            return res.json({ success: false, message: 'Invalid OTP!' });
        }

        if (user.resetOtpExpiresAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired!' });
        }


        
        user.resetOtp = '';
        user.resetOtpExpiresAt = 0;
        
        await user.save(); 


        return res.json({ success: true, message: 'OTP confiremd .' });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};





// Reset user password
export const resetPassword = async(req,res)=>{
    const {email,newPassword} = req.body;

    if(!email  || !newPassword){
        return res.json({success:false,message:'Email and new password are required'})
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }


        const encryptedPassword = await bcrypt.hash(newPassword,10);
        user.password = encryptedPassword;


        await user.save();

        return res.json({success:true,message:'Password has been reset successfully'})

    }catch(err){
        return res.json({success:false,message:err.message})

    }
}


export const isAuthenticated = async(req,res)=>{
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        
        if(!user){
            return res.json({success:false,message:"User does not exists!"})
        }
        if(user.isAccountVerified){
            return res.json({success:true})
        }else{
            return res.json({success:false})
        }

    }catch(err){
        return res.json({success:false,message:err.message})
    }
}
