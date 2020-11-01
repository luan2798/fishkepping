const config = require('../constant/config')
const jwtHelper = require('../helper/jwt.helper');

const jwtMiddleware=(req,res,next)=>{
    jwtHelper.verifyToken(req.headers.authorization,config.secret).then(a=>{
        next();
    }).catch(a=>{
        res.send(401)
    })
}
module.exports={
    jwtMiddleware:jwtMiddleware
}