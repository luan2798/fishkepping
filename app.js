const express = require('express')
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const { json } = require('body-parser');
/* let LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch'); */

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

app.get('/products', (req, res) => {
    setTimeout(a=>{
        product.find().then(products=>{
            res.json(products);
        });
    },2000);
});

let tToken;
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
                        expiresIn: 10 
                    });
                    //localStorage.setItem("abc","abc")
                    tToken=token;
                    res.redirect('./');
                }else{
                    res.redirect('./login');
                }
            }else{
                res.redirect('./login');
            }
        });
        res.json(resp);
    });
})


app.get('/', (req, res) => {
    jwtHelper.verifyToken(tToken,app.get('Secret')).then(a=>{
        readHTML(config.homePath,res)
    }).catch(a=>{
        res.redirect('./login')
    })
    //readHTML(config.homePath,res)
});

app.get('/login',(req,res)=>{
    readHTML(config.loginPath,res);
})

app.listen(config.port, () => console.log(`Hello world app listening on port ${config.port}!`));