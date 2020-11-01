const API_URL=(path)=>{
    return ("http://localhost:3000/api"+path);
}
const getToken=()=>{
    $.ajax({
        url: API_URL('/authenticate'),
        type: 'POST',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    }).done(function (result) {
        localStorage.setItem("token",result.token);
        window.location.replace("./");
    }).fail(result=>{
        $(".error").html(result.responseJSON.message)
    });
}
const getProducts=() =>{
    pageLoading();
    $.ajax({ 
        type : "GET", 
        url : API_URL('/products'), 
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`,false);},
        success : function(data) { 
            products = data;
            $(".list-sp").empty();
            showProduct();
        }, 
        error : function(result) {
            window.location.replace('./login')
        } 
    }); 
};
const checkLogin=() =>{
    $.ajax({ 
        type : "GET", 
        url : API_URL('/login'), 
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`,false);},
        success : function(data) { 
            window.location.replace('./')
        }, 
        error : function(result) {
        } 
    }); 
};
const postSignup=() =>{
    $.ajax({
        url: API_URL('/signup'),
        type: 'POST',
        data: {
            email: $('#email').val(),
            fullname: $('#email').val(),
            password: $('#password').val()
        }
    }).done(function (result) {
        window.location.replace("./login");
    }).fail(result=>{
        $(".error").html(result.responseJSON.message)
    });
};