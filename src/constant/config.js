const DATABASE_URL = 'mongodb://localhost:27017/Fishing';
const port = 3000;
const homePath='./src/views/home.html';
const loginPath='./src/views/login.html';
const signupPath='./src/views/signup.html';

module.exports={
    DATABASE_URL: DATABASE_URL,
    port: port,
    homePath: homePath,
    loginPath: loginPath,
    signupPath: signupPath,
    secret : "abc"
};