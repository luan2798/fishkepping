const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mongodb = require('mongodb');
const { json } = require('body-parser');

const config = require('./constant/config')

const MongoClient = mongodb.MongoClient;

const app = express();
app.use(express.static("view"));


app.use(cors());

// Configuring body parser middleware
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
        let products =[];
        MongoClient.connect(config.DATABASE_URL, function (err, db) {
            if (err) {
                console.log("Connect thất bại")
                throw err;
            }
            else
            {
                let product = db.collection('product');
                product.find({}).toArray(function (err,data) {
                    //nếu lỗi
                    if (err) throw err;
                    //nếu thành công
                    console.log("Connect thành công")
                    products=data;
                    res.json(products);
                });
                db.close();
            }
        });
    },2000);
});

app.get('/', (req, res) => {
    readHTML(config.homePath,res)
});

app.listen(config.port, () => console.log(`Hello world app listening on port ${config.port}!`));