const userModel=require('../models/user.model');

const jwt=require('jsonwebtoken')

async function authUser(req,res,next){
    try{
const token=req.cookies.token;
if(!token){
    return res.status(401).json({message:"Unauthorized"})
}
const decode=jwt.verify(token,process.env.JWT_SECRET);
if(decode){
    const user=await userModel.findById(decode.id);
    req.user=user;
    next();
}
    }catch(err){
        console.error("Error in auth middleware:", err);
        return res.status(500).json({message:"Internal server error"})
    }
}
module.exports={authUser};