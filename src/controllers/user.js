const jwt= require('jsonwebtoken');
const cors = require('cors');
const { json } = require('body-parser');
const bcrypt = require('bcrypt')

const jwtHelper = require('../helper/jwt.helper');
const config = require('../constant/config')
const user = require('../models/user');
const mail=require('../helper/mail');
const { query } = require('express');


const postAuthenticate=(req,res)=>{
    user.find()
        .then(users=>{
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
        })
        .catch(err=>{
            res.status(401).json({
                message: err
            });
        })
}

const postSignup=(req,res)=>{
    user.find()
        .then(users=>{
            const fuser = users.find(user => user.email === req.body.email)
            if (fuser == null) {
                bcrypt.hash(req.body.password, 10).then(function(hash) {
                    const newUser={
                        email: req.body.email,
                        fullname: req.body.fullname,
                        password: hash
                    }
                    user.insert(newUser)
                        .then(a=>{
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
        .catch(err=>{
            res.status(401).json({
                message: err
            });
        })
}

const postForgot=(req,res)=>{
    user.find()
        .then(users=>{
            const fuser = users.find(user => user.email === req.body.email)
            if (fuser == null) {
                res.status(401).json({
                        message: "Email không tồn tại"}
                    );
            }
            else{
                const payload = {
                    email: req.body.email
                };
                let token = jwt.sign(payload, config.secret, {
                    expiresIn: 100 
                });
                let mailOptions = {
                    from: 'luan.koi.42@gmail.com',
                    to: req.body.email,
                    subject: 'Xác nhận email',
                    html: `<h1>Quên mật khẩu</h1><p>đặt lại tại <a href="http://localhost:3000/reset?token=${token}">Forgot your password?</a></p>`
                };
                mail.transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                res.json({
                    message: "Email tồn tại",
                    token: token
                });
            }
        })
        .catch(err=>{
            res.status(401).json({
                message: err
            });
        })
}

const postReset=(req,res)=>{
    const token=req.body.url.split('http://localhost:3000/reset?token=')[1];
    let payload=jwt.decode(token, config.secret)
    jwtHelper.verifyToken(token,config.secret).then(a=>{
        bcrypt.hash(req.body.pass, 10).then(pass=>{
            let query = { email: payload.email }
            let value = {$set: {password:pass}}
            user.update(query,value)
                .then(a=>{
                    res.status(200).json({
                        message: "ok"
                    });
                }).catch(err=>{
                    res.status(401).json({
                        message: err
                    });
                })
        })
    }).catch(a=>{
        res.send(401)
    })
}

module.exports={
    postAuthenticate: postAuthenticate,
    postSignup: postSignup,
    postForgot: postForgot,
    postReset: postReset
}