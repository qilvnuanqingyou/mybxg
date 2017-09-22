require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery : 'jquery/jquery.min',
        cookie : 'jquery-cookie/jquery.cookie',
        template : 'artTemplate/template-web',
        bootstrap: 'bootstrap/js/bootstrap.min',
        util : '../js/util',
        common : '../js/common',
        login : '../js/login',
        teacherList: '../js/teacher-list',
        teacherAdd: '../js/teacher-add',
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});
