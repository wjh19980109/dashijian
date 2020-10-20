$(function () {
    // 调用获取用户信息的函数
    getuserinfo()
    // 创建函数获取用户信息
    function getuserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取数据失败')
                }
                //调用获取用户信息的函数
                xuanranshuju(res.data)
            }
        })
    }
    // 创建获取用户信息的函数
    function xuanranshuju(user) {
        // 1、获取用户的名字,||表示如果有用户自己写的名字那就用自己写的，没有就用昵称
        var name = user.nickname || user.username
        // 把昵称渲染进页面
        $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 如果后台给的图片里面的路径不等于空，就证明用户自己设置了头像
        if (user.user_pic !== null) {
            // 把用户自己设置的头像放入头像框，并且显示出来
            $('.layui-nav-img').attr('src', user.user_pic).show()
            // 副的头像框隐藏
            $('.text-avatar').hide()
        } else {
            // 主头像框隐藏
            $('.layui-nav-img').hide()
            // 只显示第一个用户名的大写形式
            var first = name[0].toUpperCase();
            // 渲染进页面
            $('.text-avatar').html(first)
        }
    }

    //点击退出按钮执行的操作
    var layer = layui.layer
    $('#btn-indexout').on('click', function () {
        layer.confirm('是否确认退出登陆', { icon: 3, title: '提示' }, function (index) {
            //返回登陆主页面
            location.href = '../../login.html'
            //清除token值
            localStorage.removeItem('token')
            // layui自带的勿删
            layer.close(index);
        });
    })
})