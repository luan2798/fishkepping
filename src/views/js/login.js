$('.form-login').submit(e=>{
    getToken();
    e.preventDefault();
})
checkLogin();