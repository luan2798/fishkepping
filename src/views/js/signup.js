$('.form-signup').submit(e=>{
    if ($('#password').val()===$('#repassword').val())
    {
        postSignup();
    }else{
        $(".error").html("Nhập lại mật khẩu")
    }
    e.preventDefault();
})