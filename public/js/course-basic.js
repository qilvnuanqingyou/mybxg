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
            //处理下拉联动
            $('#firstType').change(function () {
                // 获取一级分类ID
                var pid = $(this).val();
                $.ajax({
                    type: 'get',
                    url: '/api/category/child',
                    data : {cg_id : pid},
                    dataType: 'json',
                    success: function(data) {
                        //console.log(data);
                        var tpl = '<option value="">请选择二级分类...</option>{{each list}}<option value="{{$value.cg_id}}" >{{$value.cg_name}}</option>{{/each}}';
                        var html = template.render(tpl,{list:data.result});
                        $('#secondType').html(html);
                    }
                });
            });
        }
    });
});
