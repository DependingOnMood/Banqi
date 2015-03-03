/**
 * Created by Dongbo on 2/22/15.
 */
module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.js',
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-mocks.js',
            'gameLogic.js',
            'gameLogicZhuoran_test.js',
            //'http://yoav-zibin.github.io/emulator/alphaBetaService.js',
            //'aiService.js',
            //'aiService_test.js'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'gameLogic.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/',
            file : 'coverage.html'
        },

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Firefox'],

        plugins : [
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage'
        ]

    });
};
