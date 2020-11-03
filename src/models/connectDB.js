const mongodb = require('mongodb');

const config = require('../constant/config');

const MongoClient = mongodb.MongoClient;

const connectDB=() =>{
    return new Promise((resolve,reject)=>{
        MongoClient.connect(config.DATABASE_URL, function (err, db) {
            if (err) {
                console.log("Connect thất bại")
                reject(err);
            }
            else
            {
                resolve(db);
            }
        });
    })
}
module.exports={
    connectDB:connectDB
}