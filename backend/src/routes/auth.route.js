const authContoller=require('../controllers/auth.controller');

const express=require('express')
const router=express.Router();

router.post('/register',authContoller.register);
router.post('/login',authContoller.login);
module.exports=router;

