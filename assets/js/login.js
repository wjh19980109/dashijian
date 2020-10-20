$(function(){
    // 点击注册账号按钮，弹出注册页面，隐藏登录页面
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击登录按钮，弹出登录页面，隐藏注册页面
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //验证校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义一个校验规则
        pswd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        // 再自定义一个校验规则
        repswd:function(value){
            // 获取密码框里的值，[]是属性选择器。
            var pswd = $('.reg-box [name=password]').val();
            // 如果两个值不一致那么提示用户两次输入的密码不一致
            if(value !==pswd){
                return '两次输入的密码不一致'
            }
        }
    })


    // 向服务器发送注册表单的数据
    $('#form_reg').submit(function(e){
        // 阻止表单的默认提交事件
        e.preventDefault()
        // 发起ajax提交数据
        $.ajax({
            type:'POST',
            // 不需要加根路径，因为baseAPI已经处理 options.url = 根目录 + options.url
            url:'/api/reguser',
            // 提交用户名和密码框的数据
            data:{
                username:$('#form_reg [name=username]').val(),//[]是属性选择器
                password:$('#form_reg [name=password]').val()
            },
            // 成功后的回调函数
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        })
    })

    // 向服务器发送登录表单的数据
    $('#form_login').submit(function(e){
        // 阻止表单的默认提交事件
        e.preventDefault()
        // 发起ajax提交数据
        $.ajax({
            type:'POST',
            url:'/api/login',
            // 用serialize方法快速拿到表单数据
            data:$(this).serialize(),
            // 成功后的回调函数
            success:function(res){
                if(res.status !==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 把token值保存起来
                localStorage.setItem('token', res.token)
                // 页面跳转到指定页面
                location.href = '/index.html'
            }
        })
    })
})