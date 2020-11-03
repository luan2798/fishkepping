const Connect=require('./connectDB')

const find =()=>{
    return new Promise((resolve,reject)=>{
        Connect.connectDB().then(db=>{
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