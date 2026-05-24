const express=require('express')
const authMiddleware=require('../middlewares/auth.middleware')
const chatController=require('../controllers/chat.controller')
const router=express.Router();

router.post('/userChats',authMiddleware.authUser,chatController.createChat)

router.get('/getChats',authMiddleware.authUser,chatController.getChats)

router.get('/getMessages/:chatId',authMiddleware.authUser,chatController.getMessages)

module.exports=router;