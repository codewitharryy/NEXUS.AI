const express=require('express')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth.route')
const chatRoute=require('./routes/chats.route')
const cors=require('cors')
const path=require('path')
const app=express()




//using middlewares
app.use(cors({
    origin:["http://localhost:5173",
         "https://nexus-ai-vwya.onrender.com"
    ],
    methods:["GET","POST"],
    credentials:true
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'../public')))

//API routes

app.use('/api/auth',authRoute)
app.use('/api/chat',chatRoute)

app.get("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})
module.exports=app;