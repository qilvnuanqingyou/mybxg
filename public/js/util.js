define(['jquery'],function($) {
    return {
        qs: function(key) {
            var param = location.search.substr(1);
            var tcId = null;
            if(param) {
                var ps = param.split('&');
                $.each(ps,function(i,item){
                    var kv = item.split('=');
                    if(kv[0]==key) {
                        tcId = kv[1];
                        //如果是forEach，不能用return false来结束？？？
                        return false;
                    }
                })
            }
            return tcId;
        },
        setMenu: function(path) {
            $('.aside .navs a[href="'+path+'"]').addClass('active');
        }
    }
});
