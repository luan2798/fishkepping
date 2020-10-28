const DATABASE_URL = 'mongodb://localhost:27017/Fishing';
const port = 3000;
const homePath='./views/home.html';
const loginPath='./views/login.html';

module.exports={
    DATABASE_URL: DATABASE_URL,
    port: port,
    homePath: homePath,
    loginPath: loginPath,
    secret : "abc"
};