const express = require('express')
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const { json } = require('body-parser');


const config = require('./constant/config')
const product = require('./model/product');
const user = require('./model/user');
const jwtHelper = require('./helper/jwt.helper');

const app = express();
app.use(express.static("view"));
app.set('Secret', config.secret);


app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const readHTML=(path,res)=>{
	fs.readFile(path,(err,data)=>{
		if(err) throw err;
		res.write(data);
		res.end();
	})
}
let tToken;
app.get('/products', (req, res) => {
    tToken=req.headers.authorization
    jwtHelper.verifyToken(req.headers.authorization,app.get('Secret')).then(a=>{
        setTimeout(a=>{
            product.find().then(products=>{
                res.json(products);
            });
        },2000);
    }).catch(a=>{
        res.redirect('./login')
    })
});

app.post('/authenticate',(req,res)=>{
    user.find().then(users=>{
        let resp;
        users.forEach(user => {
            if(req.body.id===user.id){
                if(req.body.password===user.password){
                    const payload = {
                        check:  true,
                        id: user.id
                    };
                    let token = jwt.sign(payload, app.get('Secret'), {
                        expiresIn: 1000000000 
                    });
                    tToken=token;
                    res.json({
                        message: "abv",
                        token: token,
                        key: 1
                    })
                }else{
                    res.json({
                        message: "abv",
                        key: 2
                    })
                }
            }else{
                resp={
                    message: "abv",
                    key: 3
                };
            }
        });
        //res.json(resp);
    });
})

app.get('/', (req, res) => {
    jwtHelper.verifyToken(tToken,app.get('Secret')).then(a=>{
        readHTML(config.homePath,res)
    }).catch(a=>{
        res.redirect('./login')
    })
});

app.get('/login',(req,res)=>{
    console.log(typeof(tToken))
    jwtHelper.verifyToken(tToken,app.get('Secret')).then(a=>{
        res.redirect('./')
    }).catch(a=>{
        readHTML(config.loginPath,res)
    })
})

app.listen(config.port, () => console.log(`Hello world app listening on port ${config.port}!`));