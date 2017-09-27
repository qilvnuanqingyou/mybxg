define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
    util.setMenu('/course/course_add');
    //获取课程的Id
    var csId = util.qs('cs_id');
    //console.log(csId);
    $.ajax({
        type: 'get',
        url: '/api/course/picture',
        data: {cs_id:csId},
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            // 解析数据，渲染页面
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);
            //处理封面上传
            $('#myfile').uploadify({
                width : 80,
                height : 'auto',
                buttonText: '选择图片',
                itemTemplate:'<span></span>',
                swf : '/public/assets/uploadify/uploadify.swf',
                buttonClass : 'btn btn-success btn-sm',
                uploader : '/api/uploader/cover',
                fileObjName : 'cs_cover_original',
                formData : {cs_id : csId},
                onUploadSuccess : function(a,b){
                    console.log(b);
                    var obj = JSON.parse(b);
                    $('.preview img').attr('src',obj.result.path);
                    //图片上传成功，默认开始裁切
                    cropImage();
                    //事件里添加的自定义属性，刷新页面就不存在了
                    $('#cropBtn').text('保存图片').attr('data-flag',true);
                }
            });
            // 选中图片
            var img = $('.preview img');
            var nowCrop = null;// 保证裁切实例的唯一性
            //图片裁切功能
            $('#cropBtn').click(function() {
                var flag = $(this).attr('data-flag');
                if(flag) {
                    //提交页面
                    $('#cropForm').ajaxSubmit({
                        type : 'post',
                        url : '/api/course/update/picture',
                        data : {cs_id : csId},
                        dataType : 'json',
                        success : function(data){
                            console.log(data);
                            if(data.code == 200){
                                //cropImage(); 不管跨域的报错，再点击一次按钮可以
                                location.href = '/course/lesson?cs_id=' + data.result.cs_id;
                            }
                        }
                    });
                } else {
                    // 第一次点击按钮
                    $(this).text('保存图片').attr('data-flag',true);
                    // 实现图片裁切功能
                    cropImage();
                }
            });
            //封装一个独立的方法实现图片裁切
            function cropImage() {
                img.Jcrop({
                    boxWidth: 400,
                    aspectRatio : 2
                },function() {
                    // 销毁当前实例
                    nowCrop && nowCrop.destroy();
                    nowCrop = this;
                    //清除已经存在的图
                    $('.thumb').html('');
                    // 显示缩略图
                    this.initComponent('Thumbnailer',{width : 240,height : 120,mythumb:'.thumb'});
                    console.log(this);
                    // 获取图片的宽度和高度
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                    console.log(width);
                    console.log(height);
                    // 计算选区的数据
                    var x = 0;
                    var y = (height - width/2)/2;
                    var w = width;
                    var h = width/2;
                    console.log(x,y,w,h);
                    // 创建一个选区
                    this.newSelection();
                    this.setSelect([x,y,w,h]);

                    // 监控选区的变化,这里必须放这里面，或许是因为是不同的选区吧，还是什么？
                    img.parent().on('cropstart cropmove cropend',function(a,b,c){
                        //console.log(img.parent());
                        //console.log(3);
                        // 选区完成和变化的时候把对应的坐标数据填充到表单里
                        //console.log(c);
                        var aInput = $('#cropForm').find('input');
                        aInput.eq(0).val(c.x);
                        aInput.eq(1).val(c.y);
                        aInput.eq(2).val(c.w);
                        aInput.eq(3).val(c.h);
                    });

                });
                console.log(2);

            }
        }
    });
});
