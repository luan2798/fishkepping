$('.form-signup').submit(e=>{
    if(!$('#email-signup').val()||!$('#fullname-signup').val()||!$('#password-signup').val()||!$('#repassword-signup').val()){
        $(".error").html("Nhập đầy đủ thông tin")
    }else{
        if ($('#password-signup').val()===$('#repassword-signup').val())
        {
            postSignup()
                .then(result=>{
                    window.location.replace("./login");
                })
                .catch(result=>{
                    $(".error").html(result.responseJSON.message)
                });
        }else{
            $(".error").html("Nhập lại mật khẩu")
        }
    }
    e.preventDefault();
})