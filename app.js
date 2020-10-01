const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.static("view"));
const port = 3000;

// Where we will keep books
let products =[
    {
        id: 1,
        name:'Halfmoon Betta',
        tag:'halfmoon',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 25.00,
        incart: 0
    },
    {
        id: 2,
        name:'Dragon Scale Betta',
        tag:'dragonscale',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 35.00,
        incart: 0
    },
    {
        id: 3,
        name:'Crowntail Betta',
        tag:'crowntail',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 7.50,
        incart: 0
    },
    {
        id: 4,
        name:'Veiltail Betta',
        tag:'veiltail',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 5.00,
        incart: 0
    }
];

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