const express = require('express')
const router = express.Router();

const productController = require('../controllers/product');
const userController = require('../controllers/user');


router.get('/products',productController.jwtMiddleware,productController.productController);
router.get('/login',productController.jwtMiddleware,(req, res) => {
    res.json("Return Home");
});

router.post('/authenticate',userController.userController)

module.exports= router;