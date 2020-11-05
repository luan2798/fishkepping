const API_URL=(path)=>{
    return ("http://localhost:3000/api"+path);
}
const getToken=()=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: API_URL('/authenticate'),
            type: 'POST',
            data: {
                email: $('#email-login').val(),
                password: $('#password-login').val()
            }
        }).done(function (result) {
            return resolve(result);
        }).fail(result=>{
            return reject(result);
        });
    })
}
const getProducts=() =>{
    return new Promise((resolve,reject)=>{
        $.ajax({ 
            type : "GET", 
            url : API_URL('/products'), 
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`,false);},
            success : function(data) { 
                return resolve(data);
            }, 
            error : function(result) {
                return reject(result);
            } 
        }); 
    })
};
const checkLogin=() =>{
    return new Promise((resolve,reject)=>{
        $.ajax({ 
            type : "GET", 
            url : API_URL('/login'), 
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`,false);},
            success : function(data) { 
                return resolve(data);
            }, 
            error : function(result) {
                return reject(result);
            } 
        }); 
    })
};
const postSignup=() =>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: API_URL('/signup'),
            type: 'POST',
            data: {
                email: $('#email-signup').val(),
                fullname: $('#fullname-signup').val(),
                password: $('#password-signup').val()
            }
        }).done(function (result) {
            return resolve(result);
        }).fail(result=>{
            return reject(result);
        });
    })
};
const postForgot=() =>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: API_URL('/forgot'),
            type: 'POST',
            data: {
                email: $('#email-forgot').val(),
            }
        }).done(function (result) {
            return resolve(result);
        }).fail(result=>{
            return reject(result);
        });
    })
};
const postReset=() =>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: API_URL('/reset'),
            type: 'POST',
            data: {
                url: window.location.href,
                pass: $('#new-pass').val(),
            }
        }).done(function (result) {
            return resolve(result);
        }).fail(result=>{
            return reject(result);
        });
    })
};