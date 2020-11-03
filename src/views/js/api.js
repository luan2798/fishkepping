const API_URL=(path)=>{
    return ("http://localhost:3000/api"+path);
}
const getToken=()=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: API_URL('/authenticate'),
            type: 'POST',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
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
                email: $('#email').val(),
                fullname: $('#fullname').val(),
                password: $('#password').val()
            }
        }).done(function (result) {
            return resolve(result);
        }).fail(result=>{
            return reject(result);
        });
    })
};