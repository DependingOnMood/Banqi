module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                strict: true,
                undef: true,
                unused: true,
                bitwise: true,
                forin: true,
                freeze: true,
                latedef: true,
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                notypeof: true,
                singleGroups: true,
                jasmine: true,
                jquery: true,
                globals: {
                    module: false, // for Gruntfile.js
                    exports: false, // for protractor.conf.js
                    inject: false, // testing angular
                    angular: false,
                    console: false,
                    browser: false, element: false, by: false // Protractor
                }
            },
            all: [
                'Gruntfile.js',
                'karma.conf.js',
                'protractor.conf.js',
                //'src/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true,
                singleRun: false
            }
        },
        // Run karma and watch files using:
        // grunt karma:unit:start watch
        watch: {
            files: ['src/*.js'],
            tasks: ['jshint', 'karma:unit:run']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                // Order is important! gameLogic.js must be first because it defines myApp angular module.
                src: [
                    'src/gameLogic.js',
                    'src/game.js',
                    'src/aiService.js'
                ],
                dest: 'dist/everything.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            my_target: {
                files: {
                    'dist/everything.min.js': ['dist/everything.js']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'game.min.html': ['game.html']
                }
            }
        },
        manifest: {
            generate: {
                options: {
                    basePath: '.',
                    cache: [
                        'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js',
                        'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-touch.min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.1/ui-bootstrap-tpls.min.js',
                        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',
                        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.woff',
                        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf',
                        'http://yoav-zibin.github.io/emulator/dist/turnBasedServices.2.min.js',
                        'http://yoav-zibin.github.io/emulator/main.css',
                        'dist/everything.min.js',
                        'game.css',
                        'res/B1.png',
                        'res/B2.png',
                        'res/B3.png',
                        'res/B4.png',
                        'res/B5.png',
                        'res/B6.png',
                        'res/B7.png',
                        'res/R1.png',
                        'res/R2.png',
                        'res/R3.png',
                        'res/R4.png',
                        'res/R5.png',
                        'res/R6.png',
                        'res/R7.png',
                        'res/Hide.png',
                        'res/board.jpg',
                        'res/HelpSlide1.png',
                        'res/HelpSlide2.png',
                        'res/HelpSlide3.png',
                        'res/HelpSlide4.png',
                        'res/HelpSlide5.png',
                        'languages/en.js',
                        'languages/zh.js'
                    ],
                    network: ['dist/everything.min.js.map', 'dist/everything.js'],
                    timestamp: true
                },
                dest: 'game.appcache',
                src: []
            }
        },
        'http-server': {
            'dev': {
                // the server root directory
                root: '.',
                port: 9000,
                host: "0.0.0.0",
                cache: 1,
                showDir: true,
                autoIndex: true,
                // server default file extension
                ext: "html",
                // run in parallel with other tasks
                runInBackground: true
            }
        },
        //protractor: {
        //  options: {
        //    configFile: "protractor.conf.js", // Default config file
        //    keepAlive: true, // If false, the grunt process stops when the test fails.
        //    noColor: false, // If true, protractor will not use colors in its output.
        //    args: {
        //      // Arguments passed to the command
        //    }
        //  },
        //  all: {}
        //}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-http-server');
    //grunt.loadNpmTasks('grunt-protractor-runner');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'karma',
        'concat', 'uglify',
        'processhtml', 'manifest',
        'http-server',
        //'protractor'
    ]);

};
