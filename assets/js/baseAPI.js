// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 如果请求的根路径里面包含了/my/那么就得设置请求头就是登陆时候我们保存的token值
    if (options.url.indexOf('/my/') !== 0) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete函数,请求成功或者失败都会执行的函数，来判断用户是否是通过登陆页面进入首页的
    options.complete = function (res) {
        //如果res.responseJSON.status ==1 && res.responseJSON.message == '身份认证失败！'证明用户没有登陆就进入首页
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            //清除token值
            localStorage.removeItem('token')
            // 跳转到登陆页面
            location.href = '../../login.html'
        }
    }
})  