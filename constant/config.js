const DATABASE_URL = 'mongodb://localhost:27017/Fishing';
const port = 3000;
const homePath='./view/home.html';
const loginPath='./view/login.html';

module.exports={
    DATABASE_URL: DATABASE_URL,
    port: port,
    homePath: homePath,
    loginPath: loginPath,
    secret : "abc"
};