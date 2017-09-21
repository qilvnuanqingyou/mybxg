define(['jquery','cookie'], function ($) {
    $('#loginBtn').click(function () {
        //console.log(123);
        $.ajax({
            type: 'post',
            //url: 'http://api.studyid.com/login',
            url: '/api/login',
            data: $('#loginForm').serialize(),
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    //存储用户登录后的信息
                    $.cookie('loginInfo', JSON.stringify(data.result), {path: '/'});
                    location.href = '/main/index';
                    //location.href = '/';
                    //location.href = 'index';
                }
            }
        });
        //阻止刷新
        return false;
    });
});
