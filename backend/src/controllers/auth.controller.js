const userModel=require('../models/user.model');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function userRegister(req,res){
    //destructure the data from the request body
const {email,password,fullName:{firstName,lastName}}=req.body;

// check wheteher the user already exists in the database
const userExists = await userModel.findOne({email});
if(userExists){
    return res.status(400).json({message:"User already exists"})
}
//hash the password using bcrypt
const hashPassword=await bcrypt.hash(password,15);
//create user in database
const user=await userModel.create({
    fullName:{firstName,lastName},
    email:email,
    password:hashPassword

})
//create token
const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
//store token in cookie and send response

res.cookie("token",token)
res.status(201).json({message:"User registered successfully",
    user:{
        fullName:user.fullName,
        email:user.email,
        id:user._id
    }
})
}
async function login(req,res){
    //destructure the data from the request body
    const {email,password}=req.body;
    //check if user is present in the database
    const user=await userModel.findOne({email});
    //if not 
    if(!user){
       return res.status(404).json({message:"User not found"})
    }
    //check password
    const passCheck=await bcrypt.compare(password,user.password);
    if(!passCheck){
        return res.status(400).json({message:"Invalid credentials"})
    }
    //create token
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
    res.cookie("token",token)
    res.status(200).json({message:"Login successful",
        user:{
            fullName:user.fullName,
            email:user.email,   
            id:user._id
        }
    })
        }



module.exports={register:userRegister,login:login}

