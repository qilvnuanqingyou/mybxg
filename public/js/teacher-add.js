define(['jquery','template','util'],function($,template,util) {
    //获取url中的参数
    var tcId = util.qs('tc_id');
    if(tcId) {
        //编辑操作
        //console.log(tcId);
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: tcId},
            dataType: 'json',
            success: function(data) {
                //console.log(data);
                //用这种方式将文字信息挂载到数据上，就不用模板里再去判断了，比较省劲
                data.result.operate = '编辑讲师'
                var html = template('teacherTpl',data.result);
                $('#teacherInfo').html(html);
            }
        });
    } else {
        //添加操作
        var html = template('teacherTpl',{operate:'添加讲师'});
        $('#teacherInfo').html(html);
    }
});
