module.exports = function(grunt) {

    // set the grunt force option (in wait of csslint task force option)
    grunt.option('force',true);

    // setup
    grunt.initConfig({

        pkg:grunt.file.readJSON('package.json'),

        /**
         * Set Environment variables
         */
        env:{
            src:'./src',
            dest:'./dest',
            site:'./www',
            temp:'./tmp',
            static:'<%= env.src %>/_static',
            banner:'/* <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.homepage %>\n' +
                ' */'
        },

        /**
         * Generate CSS files
         */
        sass:{
            dev:{
                options:{
                    style:'nested'
                },
                files:{
                    '<%= env.temp %>/css/styles.merged.css':'<%= env.static %>/scss/styles.scss',
                    '<%= env.temp %>/css/styles.ie.merged.css':'<%= env.static %>/scss/styles.ie.scss'
                }
            }
        },
        csslint:{
            dev:{
                options:{
                    // https://github.com/stubbornella/csslint/wiki/Rules
                    // not all rules have been set to true since that would be too strict and not match project (as in we're not going to support IE6 so adjoining classes is irrelevant)
                    csslintrc:'.csslintrc',
                    force:true
                },
                src:['<%= env.temp %>/css/*.merged.css']
            }
        },
        autoprefixer:{
            ie:{
                options:{
                    browsers:['ie 8']
                },
                src:'<%= env.temp %>/css/styles.ie.merged.css',
                dest:'<%= env.temp %>/css/styles.ie.prefixed.css'
            },
            modern:{
                options:{
                    browsers:['last 2 versions', 'ie 9']
                },
                src:'<%= env.temp %>/css/styles.merged.css',
                dest:'<%= env.temp %>/css/styles.prefixed.css'
            }
        },
        cssmin:{
            dev:{
                files:{
                    '<%= env.temp %>/css/styles.min.css':'<%= autoprefixer.modern.dest %>',
                    '<%= env.temp %>/css/styles.ie.min.css':'<%= autoprefixer.ie.dest %>'
                }
            }
        },

        /**
         * Optimize JavaScript
         */
        jshint:{
            options:{
                jshintrc:'.jshintrc',

                // keep going on errors
                force:true
            },
            all:[
                '<%= env.static %>/js/aniday/**/*.js'
            ]
        },

        requirejs: {
            all: {
                options: {

                    // no optimization for now
                    optimize:'none', // 'uglify'

                    // use the sites main configuration file
                    mainConfigFile:'<%= env.static %>/js/aniday/main.js',
                    appDir:'<%= env.static %>/js/',
                    baseUrl:'aniday/',
                    dir:'<%= env.temp %>/js',

                    // core modules to merge
                    modules:[
                        {
                            name:'main',
                            include:[
                                // conditioner tests
                                'conditioner/tests/media'

                                // ui modules

                            ]
                        }
                    ],

                    // also merges text files
                    inlineText:true,

                    // remove all comments
                    preserveLicenseComments:false

                }
            }
        },

        uglify:{
            options:{
                //mangle:false,
                //compress:false
            },
            all:{
                files:[{
                    expand:true,
                    cwd:'<%= env.static %>/js',
                    src:'**/*.js',
                    dest:'<%= env.temp %>/js'
                }]
            },
            shim:{
                files:{
                    '<%= requirejs.all.options.dir %>/shim/all.js':[
                        '<%= env.static %>/js/shim/Function.bind.js',
                        '<%= env.static %>/js/shim/Object.defineProperty.js',
                        '<%= env.static %>/js/shim/Window.matchMedia.js',
                        '<%= env.static %>/js/shim/Window.matchMedia.addListener.js',
                        '<%= env.static %>/js/shim/ClassList.js',
                        '<%= env.static %>/js/shim/Dataset.js'
                    ]
                }
            }
        },

        /**
         * Clean
         */
        clean:{
            static:['<%= env.site %>/_static/scss','<%= env.site %>/_static/js']
        },

        /**
         * Copy static
         */
        copy:{
            static:{
                files:[
                    {
                        expand:true,
                        cwd:'<%= env.temp %>',
                        src:'**',
                        dest:'<%= env.site %>/_static/'
                    }
                ]
            }
        },

        /**
         * Generate static site using Jekyll
         */
        jekyll:{
            all:{
                options:{
                    src:'<%= env.src %>',
                    config:'./_config.yml',
                    dest:'<%= env.site %>'
                }
            }
        },

        /**
         * Setup Webserver
         */
        connect:{
            server:{
                options:{
                    hostname:'*',
                    port:4000,
                    keepalive:true,
                    base:'<%= env.site %>'
                }
            }
        },

        /**
         * Watch static files
         */
        watch:{
            sass:{
                files:['<%= env.static %>/**/*.scss'],
                tasks:['_css','copy:static']
            },
            js:{
                files:['<%= env.static %>/**/*.js'],
                tasks:['_js','copy:static']
            },
            jekyll:{
                files:['<%= env.src %>/**/*.html'],
                tasks:['_html']
            }
        },

        /**
         * Allows running of various concurrent tasks at once
         */
        concurrent:{
            all:{
                options:{
                    logConcurrentOutput: true,
                    limit:20
                },
                tasks:[

                    // start REST server and HTTP server
                    'connect:server',

                    // watch static files
                    'watch:sass','watch:js',

                    // watch HTML files
                    'watch:jekyll',

                    // start first build
                    'build'
                ]
            }
        }

    });


    /**
     * Needs the following node modules
     */
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-jekyll');

    // 'private' css build set
    grunt.registerTask('_css',['sass','csslint','autoprefixer','cssmin']);

    // 'private' js build set
    grunt.registerTask('_js',['jshint','uglify:all','requirejs','uglify:shim']);

    // 'private' html build set
    grunt.registerTask('_html',['jekyll','clean:static','copy:static']);

    /**
     * Quick build of the project
     */
    grunt.registerTask('build',['_css','_js','_html']);

    /**
     * Sets up dev environment
     */
    grunt.registerTask('dev',['concurrent']);

};