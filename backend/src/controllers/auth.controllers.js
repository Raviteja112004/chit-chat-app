import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js"; //model
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res)=>{
    const { fullName, email, password } = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields required"});
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be atleast 8 characters"});
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exists!"});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })
        if(newUser){
            //generate jsweb token 
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(200).json({
                _id:newUser.fullName,
                fullName:newUser.fullName,
                email:newUser.email,
                profiePic:newUser.profilePic

            });
        }
        else{
            return res.status(400).json({message:"User INvalid exists!"});
        }
    } catch (error) {
        console.log('Error in signup ');
        return res.status(500).json({message:"Server Error!"});
        
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});

        }
        const ispass = await bcrypt.compare(password, user.password);

        if(!ispass) return res.status(400).json({message:"Invalid Credentials"});
        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profiePic:user.profilePic

        });
    } catch (error) {
        console.log('Error in login controller',error.message);
        res.status(500).json({message:"Internal server error"});

        
    }
}
export const logout = (req, res)=>{
    try {
        res.cookie('jwt', "",{maxAge:0})
        res.status(200).json({message:"logged out succesfully"})
    } catch (error) {
        console.log('Error in login controller',error.message);
        res.status(500).json({message:"Internal server error"});

    }
}
export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id;

        if(!profilePic){
            res.status(400).json({message:"Profile Pic required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true});

        res.status(200).json(updateUser);
    } catch (error) {
        console.log('Error in updated  profile:' ,error.message);
        
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = async (req, res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('Error in updated  profile:' ,error.message);
        
        res.status(500).json({message:"Internal server error"});
    }
}