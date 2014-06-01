'use strict';

// Path for files
var paths = {
    js: [
        '*.js',
        'models/**/*.js',
        'controllers/**/*.js',
        'config/**/*.js',
        'core/**/*.js',
        'middleware/**/*.js',
        'lib/**/*.js',
        'test/**/*.js',
        'templates/basic/js/*.js'
    ],
    css: [
        'templates/basic/css/*.css'
    ]
};

module.exports = function (grunt) {
    // Load config
    var config = require('./core/Config')(process.env.NODE_ENV || 'development');

    // Show time of executed tasks
    if (process.env.NODE_ENV !== 'production') {
        require('time-grunt')(grunt);
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch changes in files
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        // Check js syntax and validate
        jshint: {
            all: {
                src: paths.js,
                options: {
                    jshintrc: true
                }
            }
        },

        // Check css syntax and validate
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: paths.css
            }
        },

        // Clean logs and tmp files
        clean: [
            'logs/**/*'
        ],

        // Minify files
        /*uglify: {
            options: {
                mangle: false
            },
            production: {
                files: '<%= assets.js %>'
            }
        },*/

        // Apidoc configuration.
        apidoc: {
            myapp: {
                src: config.apidoc.src,
                dest: config.apidoc.dest,
                template: config.apidoc.template,
                options: {
                    debug: config.debug,
                    includeFilters: ['.*\\.js$'],
                    excludeFilters: ['node_modules/'],
                    marked: {
                        gfm: true
                    }
                }
            }
        },

        // Apidoc configuration.
        docco: {
            dev: {
                src: [
                    'core/**/*.js'
                ],
                options: {
                    dest: 'docs/'
                }
            }
        },

        // Set a default enviroment
        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },

        // Init system
        forever: {
            server: {
                options: {
                    index: 'api.js',
                    logDir: 'logs'
                }
            }
        },

        // Init system
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
                        PORT: config.server.port
                    },
                    cwd: __dirname
                }
            }
        },

        // Concurrent tasks
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            prod: {
                tasks: ['forever:server:restart', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // Mocha test
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },

        // Show notifications
        notify: {
            watch: {
                options: {
                    title: 'Task Complete', // optional
                    message: 'Uglify finished running', //required
                }
            },
            server: {
                options: {
                    message: 'Server is ready!'
                }
            }
        }

    }); // grunt.initConfig

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        //grunt.registerTask('default', ['uglify', 'apidoc', 'concurrent:prod']);
        grunt.registerTask('default', ['clean', 'apidoc', 'concurrent:prod']);
    } else {
        grunt.registerTask('default', ['clean', 'jshint', 'csslint', 'apidoc', 'concurrent:dev']);
    }

    // Production task
    grunt.registerTask('production', ['clean', 'env:prod', 'apidoc', 'concurrent:prod']);

    //Test task.
    grunt.registerTask('test', ['clean', 'env:test', 'mochaTest']);

    //Generate documentation task.
    grunt.registerTask('doc', ['apidoc', 'docco']);

}; // module.exports
