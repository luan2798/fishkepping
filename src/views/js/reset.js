$('.form-reset').submit(e=>{
    if(!$('#new-pass').val()||!$('#renew-pass').val()){
        $(".error").html("Nhập đầy đủ thông tin")
    }else{
        if ($('#new-pass').val()===$('#renew-pass').val())
        {
            postReset()
                .then(data=>{
                    window.location.replace('./login')
                })
                .catch(err=>{
                    $(".error").html("Cập nhật không thành công") 
                })
        }else{
            $(".error").html("Nhập lại mật khẩu")
        }
    }
    e.preventDefault();
})