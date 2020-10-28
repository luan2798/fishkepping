const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { json } = require('body-parser');


const config = require('./constant/config')
const apiRouter=require('./routers/api')
const basicRouter=require('./routers/basic')
const app = express();
app.use(express.static("views"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',apiRouter);
app.use('/',basicRouter);



app.listen(config.port, () => console.log(`Hello world app listening on port ${config.port}!`));