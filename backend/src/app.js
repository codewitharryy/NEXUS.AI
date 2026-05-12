const express=require('express')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth.route')
const chatRoute=require('./routes/chats.route')
const cors=require('cors')
const app=express()
//app middlewares

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json())
app.use(cookieParser())

//API routes
app.use('/auth',authRoute)
app.use('/chat',chatRoute)


module.exports=app;