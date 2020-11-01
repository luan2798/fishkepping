const express = require('express')
const router = express.Router();

const productController = require('../controllers/product');
const userController = require('../controllers/user');
const Middleware=require('../middleware/jwt')


router.get('/products',Middleware.jwtMiddleware,productController.getProduct);
router.get('/login',Middleware.jwtMiddleware,(req, res,) => {
    res.json("Return Home");
});

router.post('/authenticate',userController.postAuthenticate)
router.post('/signup',userController.postSignup)

module.exports= router;