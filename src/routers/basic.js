const express = require('express')
const router = express.Router();
const config = require('../constant/config')

router.get('/', (req, res) => {
    res.render(config.homePath,{
        title: "Home Page"
    })    
});

router.get('/login',(req,res)=>{
	res.render(config.loginPath,{
        title: "Login"
    })
})

router.get('/signup',(req,res)=>{
    res.render(config.signupPath,{
        title: "Sign Up"
    })
})

router.get('/forgot',(req,res)=>{
    res.render(config.forgotPath,{
        title: "Forgot Password"
    })
})

router.get('/endforgot',(req,res)=>{
    res.render(config.endforgotPath,{
        title: "Forgot"
    })
})

router.get('/reset',(req,res)=>{
    res.render(config.resetPath,{
        title: "Reset Password"
    })
})

module.exports=router;