require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery : 'jquery/jquery.min',
        cookie : 'jquery-cookie/jquery.cookie',
        template : 'artTemplate/template-web',
        bootstrap: 'bootstrap/js/bootstrap.min',
        datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker',
        language: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate: 'validate/jquery-validate.min',
        form: 'jquery-form/jquery.form',
        uploadify: 'uploadify/jquery.uploadify.min',
        region: 'jquery-region/jquery.region',
        ckeditor: 'ckeditor/ckeditor',
        jcrop: 'jcrop/js/Jcrop',
        nprogress : 'nprogress/nprogress',
        util : '../js/util',
        common : '../js/common',
        login : '../js/login',
        teacherList: '../js/teacher-list',
        teacherAdd: '../js/teacher-add',
        settings: '../js/settings',
        index: '../js/index',
        courseList: '../js/course-list',
        courseAdd: '../js/course-add',
        courseBasic: '../js/course-basic',
        coursePicture: '../js/course-picture',
        courselesson: '../js/course-lesson',
        state: '../js/state'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        language : {
            deps : ['jquery','datepicker']
        },
        validate: {
            deps: ['jquery']
        },
        uploadify: {
            deps: ['jquery']
        },
        ckeditor : {
            exports : 'CKEDITOR'
        },
        jcrop : {
            deps : ['jquery']
        }
    }
});
