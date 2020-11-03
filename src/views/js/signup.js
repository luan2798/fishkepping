$('.form-signup').submit(e=>{
    if(!$('#email').val()||!$('#fullname').val()||!$('#password').val()||!$('#repassword').val()){
        $(".error").html("Nhập đầy đủ thông tin")
    }else{
        if ($('#password').val()===$('#repassword').val())
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