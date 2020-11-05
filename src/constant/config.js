const path = require('path')

const DATABASE_URL = 'mongodb://localhost:27017/Fishing';
const port = 3000;
const homePath=path.join(__dirname, '../views/home.ejs');
const loginPath=path.join(__dirname, '../views/login.ejs');
const signupPath=path.join(__dirname, '../views/signup.ejs');
const forgotPath=path.join(__dirname, '../views/forgot-1.ejs');
const endforgotPath=path.join(__dirname, '../views/forgot-2.ejs');
const resetPath=path.join(__dirname, '../views/reset.ejs');

module.exports={
    DATABASE_URL: DATABASE_URL,
    port: port,
    homePath: homePath,
    loginPath: loginPath,
    signupPath: signupPath,
    forgotPath: forgotPath,
    endforgotPath: endforgotPath,
    resetPath: resetPath,
    secret : "abc"
};