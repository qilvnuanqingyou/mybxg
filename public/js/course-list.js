define(['jquery','template','util'],function($,template,util){
    // 设置导航菜单选中
    util.setMenu(location.pathname);
    $.ajax({
        type: 'get',
        url: '/api/course',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            var html = template('courseTpl',{list : data.result});
            $('#courseInfo').html(html);
        }
    });
});
