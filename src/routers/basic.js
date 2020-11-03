const express = require('express')
const router = express.Router();
const config = require('../constant/config')

router.get('/', (req, res) => {
    res.render(config.homePath)    
});

router.get('/login',(req,res)=>{
	res.render(config.loginPath)
})
router.get('/signup',(req,res)=>{
    res.render(config.signupPath)
})
module.exports=router;