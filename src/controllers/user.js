const jwt= require('jsonwebtoken');
const cors = require('cors');
const { json } = require('body-parser');
const bcrypt = require('bcrypt')


const config = require('../constant/config')
const user = require('../models/user');


const userController=(req,res)=>{
    user.find().then(users=>{
        let resp;
        const fuser = users.find(user => user.email === req.body.email)
        if (fuser == null) {
            res.status(401).json({
                    message: "Tên đăng nhập không đúng"}
                 );
        }
        else{
            bcrypt.compare(req.body.password, fuser.password).then(a=>{
                if (a){
                    const payload = {
                        check:  true,
                        email: user.email
                    };
                    let token = jwt.sign(payload, config.secret, {
                        expiresIn: 100 
                    });
                    res.json({
                        message: "đăng nhập thành công",
                        token: token
                    });
                }
                else{
                    res.status(401).json({
                        message: "sai mật khẩu"}
                    );
                }
            })
        }
    });
}
module.exports={
    userController:userController
}