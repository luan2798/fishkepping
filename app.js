const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mongodb = require('mongodb');
const { json } = require('body-parser');

let MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/Fishing';
const app = express();
app.use(express.static("view"));
const port = 3000;

// Where we will keep books
let products =[];

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var a = db.collection('product');
    a.find({}).toArray(function (err,data) {
        //nếu lỗi
        if (err) throw err;
        //nếu thành công
        console.log(data);
        products=data;
    });
    db.close();
});

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
        res.json(products);
    },2000);
});

app.get('/', (req, res) => {
    readHTML('./view/home.html',res)
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));