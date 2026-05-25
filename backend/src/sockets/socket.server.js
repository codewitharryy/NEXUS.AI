const { createServer } = require("http");
const app = require("../app");
const http = require("http");
const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");
const { v4: uuidv4 } = require("uuid");

const httpServer = http.createServer(app);
async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
  cors: {
    origin: ["https://nexus-ai-vwya.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST"],
    allowHeaders: ["Content-Type","Authorization"],
    credentials: true,
  },
});

  // *** user AUthentication middleware for socket connection ***
  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers?.cookie || "";
    // console.log(cookies);
    const parseCookies = cookie.parse(cookies);
    if (!parseCookies.token) {
      return next(new Error("Unauthorized,no token found"));
    }
    try {
      const decode = jwt.verify(parseCookies.token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(decode.id);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Unauthorized,invalid token"));
    }
  });
  io.on("connection", (socket) => {
  
    socket.on("ai-message", async (payLoad) => {
      try{
        /*
        payLoad:{
            chatId:"chatId",
            content: user text message
        }
 */
      // Adding optimization by storing 1.user message,2.generating vector and 3. storing in pinecone vector DB in parallel to reduce latency
    
  const [requestMessage,vectors]=await Promise.all([
        messageModel.create({
        chat: payLoad.chatId,
        user: socket.user._id,
        content: payLoad.content,
        role: "user",
        }),
        aiService.generateVector(payLoad.content),
       
      ]);

      if (!vectors || vectors.length === 0) {
        throw new Error("Empty vector passed to Pinecone");
      }
      await createMemory({
        vectors,
        metadata: {
          chat: payLoad.chatId,
          user: socket?.user?._id || "anonymous",
          text: payLoad.content,
        },
        messageId: requestMessage._id,
      });

      // optimizing by fetching memory and chat history in parallel to reduce latency
      const [memory,chatHistory]= await Promise.all([
        queryMemory({
        queryVector: vectors,
        limit: 5,
        metadata: {
          user:socket.user._id
        },
      }),
      messageModel
          .find({
            chat: payLoad.chatId,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean().then(messages=>{
            return messages.reverse();
          })
    ]);

    const stm=  chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        })
        const ltm=[{
            role:"user",
            parts:[{text:`
                        these are some previous messages from the chat history which can help you to answer better, 
                        but you should primarily rely on the current message and these are just for reference:
                        ${memory.map(item=>item.metadata.text).join("\n")}}
                `}]
        }]
// console.log(...stm,...ltm);


      // sending chat history to the ai model and getting response
      const response = await aiService.generateResponse([...stm,...ltm]);

       //sending response back to the same client
      socket.emit("ai-response", {
        response: response,
        chat: payLoad.chatId,
      });

      // storing ai response and its vector in DB and Pinecone in parallel to reduce latency
        const [responseMessage,responseVectors]= await Promise.all([
messageModel.create({
        chat: payLoad.chatId,
        user: socket.user._id,
        content: response,
        role: "model",
      }),
      aiService.generateVector(response),
     
        ]);
 await createMemory({
        vectors: responseVectors,
        metadata: {
          chat: payLoad.chatId,
          user: socket.user._id,
          text: response,
        },
        messageId: responseMessage._id,
      })
      }
      catch(err){
        console.error("Error processing ai-message:", err);
        socket.emit("ai-response", {
          response: "Sorry, something went wrong while processing your message.",
          chat: payLoad.chatId,
        });
      }
    });
  });
}

module.exports = { initSocketServer, httpServer };
