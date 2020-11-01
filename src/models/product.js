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

const find =()=>{
    return new Promise((resolve,reject)=>{
        connectDB().then(db=>{
            let Product = db.collection('product');
            Product.find({}).toArray(function (err,data) {
                db.close();
                //nếu lỗi
                if (err){
                    return reject(err);
                }
                //nếu thành công
                console.log("Connect thành công")
                return resolve(data);
            });
        })
    })
}

module.exports={
    find: find
};