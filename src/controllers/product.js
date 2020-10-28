const cors = require('cors');
const { json } = require('body-parser');


const config = require('../constant/config')
const product = require('../models/product');
const jwtHelper = require('../helper/jwt.helper');

const jwtMiddleware=(req,res,next)=>{
    jwtHelper.verifyToken(req.headers.authorization,config.secret).then(a=>{
        next();
    }).catch(a=>{
        res.send(401)
    })
}
const productController=(req,res)=>{
    setTimeout(a=>{
        product.find().then(products=>{
            res.json(products);
        });
    },2000);

}
module.exports={
    jwtMiddleware:jwtMiddleware,
    productController:productController
}