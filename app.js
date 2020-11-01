const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { json } = require('body-parser');


const config = require('./src/constant/config')
const apiRouter=require('./src/routers/api')
const basicRouter=require('./src/routers/basic')
const app = express();
app.use(express.static("./src/views"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',apiRouter);
app.use('/',basicRouter);



app.listen(config.port, () => console.log(`Hello world app listening on port ${config.port}!`));