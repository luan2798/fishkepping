const express = require('express')
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const { json } = require('body-parser');
const bcrypt = require('bcrypt')


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
        res.send(401)
    })
});

app.post('/authenticate',(req,res)=>{
    user.find().then(users=>{
        let resp;
        const fuser = users.find(user => user.email === req.body.email)
        if (fuser == null) {
            res.json({
                message: "Tên đăng nhập không đúng",
                key: 3
            });
        }
        bcrypt.compare(req.body.password, fuser.password).then(a=>{
            if (a){
                const payload = {
                    check:  true,
                    email: user.email
                };
                let token = jwt.sign(payload, app.get('Secret'), {
                    expiresIn: 100 
                });
                res.json({
                    message: "đăng nhập thành công",
                    token: token,
                    key: 1
                });
            }
            else{
                res.json({
                    message: "Sai mật khẩu",
                    key: 2
                });
            }
        })
    });
})

app.get('/', (req, res) => {
    readHTML(config.homePath,res)    
});

app.get('/login',(req,res)=>{
    jwtHelper.verifyToken(tToken,app.get('Secret')).then(a=>{
        res.redirect('./')
    }).catch(a=>{
        readHTML(config.loginPath,res)
    })
})

app.listen(config.port, () => console.log(`Hello world app listening on port ${config.port}!`));