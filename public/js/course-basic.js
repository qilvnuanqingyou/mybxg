define(['jquery','template','util'],function($,template,util){
    // 设置导航菜单选中
    util.setMenu('/course/course_add');
    // 获取课程ID
    var csId = util.qs('cs_id');
    // 获取标志位
    var flag = util.qs('flag');
    $.ajax({
        type : 'get',
        url : '/api/course/basic',
        data : {cs_id : csId},
        dataType : 'json',
        success: function(data) {
            //console.log(data);
            if(flag){
                data.result.operate = '编辑课程';
            }else{
                data.result.operate = '添加课程';
            }
            // 解析数据，渲染页面
            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);
        }
    });
});
