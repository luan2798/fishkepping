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
            let User = db.collection('user');
            User.find({}).toArray(function (err,data) {
                db.close();
                //nếu lỗi
                if (err){
                    throw err;
                }
                //nếu thành công
                console.log("Connect thành công")
                return resolve(data);
            });
        })
    })
}
const insert =(newUser)=>{
    return new Promise((resolve,reject)=>{
        connectDB().then(db=>{
            let User = db.collection('user');
            User.insertOne(newUser, function (err,res) {
                db.close();
                //neu xay ra loi
                if (err) throw err;
                console.log('Them thanh cong');
                return resolve({
                    message: "thêm thành công"
                })
            });
        })
    })
}
module.exports={
    find: find,
    insert: insert
};