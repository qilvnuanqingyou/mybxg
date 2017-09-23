define(['jquery', 'template', 'util','datepicker','language','validate','form'], function ($, template, util) {
    //获取url中的参数
    var tcId = util.qs('tc_id');
    if (tcId) {
        //编辑操作
        //console.log(tcId);
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: tcId},
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                //用这种方式将文字信息挂载到数据上，就不用模板里再去判断了，比较省劲
                data.result.operate = '编辑讲师'
                var html = template('teacherTpl', data.result);
                $('#teacherInfo').html(html);
                submitForm('/api/teacher/update');
            }
        });
    } else {
        //添加操作
        var html = template('teacherTpl', {operate: '添加讲师'});
        $('#teacherInfo').html(html);
        submitForm('/api/teacher/add');
    }
    //基于表单验证插件和表单提交插件进行表单提交
    function submitForm(url) {
        $('#teacherForm').validate({
            sendForm: false,
            valid: function() {
                //满足所有条件，提交表单
                $(this).ajaxSubmit({
                    url: url,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                        if(data.code == 200){
                            location.href = '/teacher/teacher_list';
                        }
                    }
                });
            },
            description: {
                tcName: {
                    required: '用户名不能为空'
                },
                tcPass: {
                    required: '密码不能为空',
                    pattern: '必须是6位数字'
                },
                tcJoinDate: {
                    required: '日期不能为空'
                }
            }
        });
    }

    //表单提交函数
    /*function submitForm(url) {
        $('#teacherBtn').click(function () {
            $.ajax({
                type: 'post',
                url: url,
                data: $('#teacherForm').serialize(),
                dataType: 'json',
                success: function (data) {
                    //console.log(data);
                    if (data.code == 200) {
                        location.href = '/teacher/teacher_list';
                    }
                }
            });
            console.log($('#teacherForm').serialize());
        });
    }*/
});
