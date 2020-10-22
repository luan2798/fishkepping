const getToken=()=>{
    $.ajax({
        url: 'http://localhost:3000/authenticate',
        type: 'POST',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    }).done(function (result) {
        if(result.key===1)
        {
            localStorage.setItem("token",result.token);
            window.location.replace("./");
        }
        else{
            alert(result.message)
        }
    });
}
$('.form-login').submit(e=>{
    getToken();
    e.preventDefault();
})