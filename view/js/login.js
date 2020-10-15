const getToken=()=>{
    $.ajax({
        url: 'http://localhost:3000/authenticate',
        type: 'POST',
        data: {
            id: $('#username').val(),
            password: $('#password').val()
        }
    }).done(function (result) {
        localStorage.setItem("token",result.token)
    });
}
$('.login-button').click(e=>{
    getToken();
})