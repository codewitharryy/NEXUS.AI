const chatModel=require('../models/chat.model')
const {authUser}=require('../middlewares/auth.middleware')


async function createChat(req,res){
    const{title}=req.body;
    const user=req.user;
    const chat=await chatModel.create({
        user:user._id,
        title:title
    })
    return res.status(201).json({message:"Chat created successfully",
        chat:{
            id:chat._id,
            title:chat.title,
            lastActivity:chat.lastActivity, 
            user:chat.user
        }
    })
}

async function getChats(req,res){
    const user=req.user;
    const chats=await chatModel.find({user:user._id})
    return res.status(200).json({message:"Chats fetched successfully",
    chats:chats.map(chat=>({
        id:chat._id,
        title:chat.title,
        lastActivity:chat.lastActivity, 
        user:chat.user
    }))
})
}
async function getMessages(req,res){
    const {chatId}=req.params;
    const user=req.user;
    const chat=await chatModel.findOne({_id:chatId,user:user._id}).populate({
        path: "messages",
        options: { sort: { createdAt: 1 } },
    });
    if(!chat){
        return res.status(404).json({message:"Chat not found"})
    }
    return res.status(200).json({message:"Messages fetched successfully",
    messages:chat.messages.map(message=>({
        id:message._id,
        content:message.content,
        role:message.role,
        createdAt:message.createdAt
    }))
})
}
module.exports={createChat,getChats,getMessages}

