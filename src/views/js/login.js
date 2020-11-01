$('.form-login').submit(e=>{
    getToken();
    e.preventDefault();
})
checkLogin();
$('#signup').click(e=>{
    window.location.replace('./signup')
})