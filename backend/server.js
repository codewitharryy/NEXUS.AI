require("dotenv").config();
const app=require('./src/app')
const connectDB=require('./src/db/db')
const {initSocketServer,httpServer}=require('./src/sockets/socket.server')

connectDB();
initSocketServer(httpServer);

httpServer.listen("5000",()=>{
    console.log("Server is running on port 5000");
})

// app.listen(5000,()=>{
//     console.log(" Server is running on port  3000");
// })

