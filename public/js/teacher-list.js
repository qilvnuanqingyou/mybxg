define(['jquery', 'template','util','bootstrap','state'], function ($, template,util) {
    // 设置导航菜单选中
    util.setMenu(location.pathname);
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            //返回的数据中的tc_id和tc_status要保存下来(自定义属性的方式保存下来)，给注销启用功能传参用
            var html = template('teacherTpl', {list: data.result});
            $('#teacherInfo').html(html);

            /*注销和启用功能*/
            //注销和启用要访问服务器接口，需要传两个参数，tc_id和tc_status，这两个参数在列表请求的返回数据中有
            $('.eod').click(function () {
                var that = this;// 当前点击的按钮
                //获取当前点击按钮的父元素中保存的tc_id和tc_status信息
                var td = $(this).closest('td');
                var tcId = td.attr('data-tcId');
                var tcStatus = td.attr('data-status');
                // 调用后台接口
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data: {tc_id: tcId, tc_status: tcStatus},
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
                            //将状态码更新到td中
                            td.attr('data-status', data.result.tc_status);
                            //根据状态码重新填充内容
                            if (data.result.tc_status == 0) {
                                $(that).text('启用');
                            } else {
                                $(that).text('注销');
                            }
                        }
                    }
                });
            });

            /*查看讲师功能*/
            //需要传入tc_id
            $('.preview').click(function() {
                //获取当前点击按钮的父元素中保存的tc_id
                var td = $(this).closest('td');
                var tcId = td.attr('data-tcId');
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {tc_id: tcId},
                    dataType: 'json',
                    success: function(data) {
                        //console.log(data.result);
                        //解析数据，渲染页面
                        var html = template('modalTpl',data.result);
                        $('#modalInfo').html(html);
                        //bootstrap方法，显示弹窗
                        $('#teacherModal').modal();
                    }
                });
            });
        }
    });
});



/*
 *启用注销功能更新状态码处出了一个大bug
 *过程和现象分析：
 *更新状态码时，写错了，写成了td.attr('data-tcId',data.result.tc_status);那么就给点击的那个td设置了data-tcId=1,接着又来回点击了
 *按钮，切换了状态码，刚好切到data-status=1时，这是点击了退出系统按钮，然后admin再去登录怎么都登录不了系统了，这是为什么呢？
 *原因分析：
 *首先要知道后台的handle.php做了件什么事，它根据传过来的tc_id值，来切换这个tc_id对应的用户的状态码，在数据库中tc_id代表的用户
 *是admin,那么切换状态码，切的是admin的，当admin的状态码被切到0时，就是admin被注销了，就是登录不了系统的，另PHP中关于admin能否登
 *录进去系统是有3个条件的，$where['tc_name']、$where['tc_pass']、$where['tc_status']，就是用户名、密码、状态码为0，才可以登录成功
 *测试方法：
 *先打开数据库，打开teacher数据表，然后在浏览器调试，F12，将第一个的data-tcId设置为1，然后来回点击按钮，切换状态码，
 *切换的同时观察表中的第一个数据的tc_status值,会看到切换的是admin的状态，当为1时，相当于是注销了admin
 *
 *
 * */
