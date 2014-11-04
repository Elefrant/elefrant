'use strict';

var path = require('path'),
        config  = require('./node_modules/elefrantio/lib/config');

module.exports = function (grunt) {
    var options = {
        configPath: path.join(__dirname, 'config'),
        actionPath: path.join(__dirname, 'actions')
    };
    var conf = config(options),
            pkg = grunt.file.readJSON('package.json'),
            env = process.env.NODE_ENV || conf.env;

    if (env !== 'production') {
        require('time-grunt')(grunt);
    }

    grunt.initConfig({
        pkg: pkg,

        watch: {
            js: {
                files: [
                    '*.js',
                    'actions/**/*.js',
                    'components/**/*.js',
                    'config/**/*.js'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            src: [
                '*.js',
                'actions/**/*.js',
                'config/**/*.js'
            ]
        },

        clean: [
            '.tmp'
        ],

        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },

        forever: {
            server: {
                options: {
                    index: 'cluster.js',
                    command: 'node --stack_size=8192 --max-old-space-size=8192'
                }
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['node_modules/**'],
                    ext: 'js,coffee',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: conf.server.port
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        mochaTest: {
            options: {
                require: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },

        notify: {
            server: {
                options: {
                    message: 'Server is ready!'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    if (env === 'production') {
        grunt.registerTask('default', ['clean', 'forever:server:restart']);
    } else {
        grunt.registerTask('default', ['clean', 'jshint', 'concurrent', 'notify:server']);
    }

    grunt.registerTask('prod', ['clean', 'env:prod', 'forever:server:restart']);

    grunt.registerTask('test', ['clean', 'env:test', 'mochaTest']);
};