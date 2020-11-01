const express = require('express')
const router = express.Router();
const fs = require('fs');
const config = require('../constant/config')

const readHTML=(path,res)=>{
	fs.readFile(path,(err,data)=>{
		if(err) throw err;
		res.write(data);
		res.end();
	})
}
router.get('/', (req, res) => {
    readHTML(config.homePath,res)    
});

router.get('/login',(req,res)=>{
    readHTML(config.loginPath,res)
})
router.get('/signup',(req,res)=>{
    readHTML(config.signupPath,res)
})
module.exports=router;