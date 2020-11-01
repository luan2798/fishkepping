const cors = require('cors');
const { json } = require('body-parser');



const product = require('../models/product');


const getProduct=(req,res)=>{
    product.find().then(products=>{
        res.json(products);
    }).catch(err=>{
        res.status(404).json(err)
    })
}
module.exports={
    getProduct:getProduct
}