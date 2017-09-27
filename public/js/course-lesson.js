define(['jquery','template','util','bootstrap','form'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/course/course_add');
  // 获取课程ID
  var csId = util.qs('cs_id');
  // 获取所有的课时列表数据
  $.ajax({
    type : 'get',
    url : '/api/course/lesson',
    data : {cs_id : csId},
    dataType : 'json',
    success : function(data){
      console.log(data);
      // 解析数据，渲染页面
      var html = template('lessonTpl',data.result);
      $('#lessonInfo').html(html);
      //处理添加课时操作
      $('#addLesson').click(function(){
        var html = template('modalTpl',{operate : '添加课时',ct_is_free: 0});
        $('#modalInfo').html(html);
        $('#chapterModal').modal();
        // 处理添加课时的表单提交
        $('#addOreditBtn').click(function(){
          //console.log(1);
          var is_free = $('#lessonForm .is_free')[0].checked ? 1 : 0;
          $('#lessonForm').ajaxSubmit({
            type : 'post',
            url : '/api/course/chapter/add',
            data : {ct_cs_id : csId,ct_is_free: is_free},
            dataType : 'json',
            success : function(data){
              console.log(data);
              if(data.code == 200){
                location.reload();
              }
            }
          });
        });
      });
      //处理编辑课时操作
      $('.editLesson').click(function(){
        // 获取课时ID
        var ctId = $(this).attr('data-ctId');
        $.ajax({
          type: 'get',
          url: '/api/course/chapter/edit',
          data: {ct_id:ctId},
          dataType: 'json',
          success: function(data) {
            console.log(data);
            // 解析数据，渲染模态框
            data.result.operate = '编辑课时';
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html);
            $('#chapterModal').modal();
            // 处理编辑课时的表单提交
            $('#addOreditBtn').click(function(){
              var is_free = $('#lessonForm .is_free')[0].checked ? 1 : 0;
              $('#lessonForm').ajaxSubmit({
                type : 'post',
                url : '/api/course/chapter/modify',
                data : {ct_cs_id : csId,ct_id : ctId,ct_is_free: is_free},
                dataType : 'json',
                success : function(data){
                  if(data.code == 200){
                    location.reload();
                  }
                }
              });
            });
          }
        });
      });
    }
  });
  
});