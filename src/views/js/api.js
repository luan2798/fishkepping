const getToken=()=>{
    $.ajax({
        url: 'http://localhost:3000/api/authenticate',
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
        url : 'http://localhost:3000/api/products', 
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
        url : 'http://localhost:3000/api/login', 
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`,false);},
        success : function(data) { 
            window.location.replace('./')
        }, 
        error : function(result) {
        } 
    }); 
};