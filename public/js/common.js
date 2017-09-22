define(['jquery','template','cookie'], function ($,template) {
    //NProgress.start();
    //NProgress.done();
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    //退出功能
    $('#logoutBtn').click(function () {
        $.ajax({
            type: 'post',
            url: '/api/logout',
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                if (data.code == 200) {
                    location.href = '/main/login';
                }
            }
        });
    });
//通过判断是否携带PHPSESSID值来判断是否登录过，以防直接地址输入index进入，如果本身就在登录页，则不需要跳转
    var flag = $.cookie('PHPSESSID');
    if (!flag && location.pathname != '/main/login') {
        location.href = '/main/login';
    }
//将cookie中保存的头像信息渲染到侧边
    var loginInfo = $.cookie('loginInfo');
    loginInfo = loginInfo && JSON.parse(loginInfo);
    var tpl = '<div class="avatar img-circle"> <img src="{{tc_avatar}}"> </div> <h4>{{tc_name}}</h4>';
    var html = template.render(tpl,loginInfo);
    $('.aside .profile').html(html);
    //$('.aside .profile img').attr('src', loginInfo.tc_avatar);
    //$('.aside .profile h4').html(loginInfo.tc_name);
});




