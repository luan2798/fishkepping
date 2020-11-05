const Connect=require('../helper/connectDB')

const find =()=>{
    return new Promise((resolve,reject)=>{
        Connect.connectDB()
            .then(db=>{
                let User = db.collection('user');
                User.find({}).toArray(function (err,data) {
                    db.close();
                    //nếu lỗi
                    if (err){
                        return reject (err);
                    }
                    //nếu thành công
                    console.log("Connect thành công")
                    return resolve(data);
                });
            })
            .catch(err=>{
                return reject (err);
            })
    })
}
const insert =(newUser)=>{
    return new Promise((resolve,reject)=>{
        Connect.connectDB()
            .then(db=>{
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
            .catch(err=>{
                return reject (err);
            })
    })
}

const update=(query,value)=>{
    return new Promise((resolve,reject)=>{
        Connect.connectDB()
            .then(db=>{
                let User = db.collection('user');
                User.updateOne(query,value, function (err,res) {
                    db.close();
                    //neu xay ra loi
                    if (err) throw err;
                    console.log('cập nhật thành công');
                    return resolve({
                        message: "ok"
                    })
                });
            })
            .catch(err=>{
                return reject (err);
            })
    })
}

module.exports={
    find: find,
    insert: insert,
    update: update
};