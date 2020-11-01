const jwt= require('jsonwebtoken');
const cors = require('cors');
const { json } = require('body-parser');
const bcrypt = require('bcrypt')


const config = require('../constant/config')
const user = require('../models/user');


const postAuthenticate=(req,res)=>{
    user.find().then(users=>{
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
const postSignup=(req,res)=>{
    user.find().then(users=>{
        const fuser = users.find(user => user.email === req.body.email)
        if (fuser == null) {
            bcrypt.hash(req.body.password, 10).then(function(hash) {
                const newUser={
                    email: req.body.email,
                    fullname: req.body.fullname,
                    password: hash
                }
                user.insert(newUser).then(a=>{
                    res.status(200).json({
                        message: "ok"
                    });
                }).catch(err=>{
                    res.status(401).json({
                        message: err
                    });
                })
            });
        }
        else{
            res.status(401).json({
                message: "Email đã tồn tại"
            });
        }
    })
}
module.exports={
    postAuthenticate:postAuthenticate,
    postSignup:postSignup
}