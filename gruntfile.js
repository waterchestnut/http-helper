module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'tool/**/*.js', 'conf/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                },
                '-W069': true,
                force: true,
                reporterOutput: 'coverage/jshint-reports.xml',
                reporter: 'checkstyle'
            }
        },
        clean: {
            coverage: {
                src: ['coverage/*'],
                filter: function (filepath) {
                    return !(/.*coverage(\/|\\)(node_modules).*/.test(filepath));
                }
            }
        },
        copy: {
            coverage: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: 'coverage/',
                        filter: function (filepath) {
                            return !(/.*(node_modules|doc|gruntfile.js|coverage|htmlReports).*/.test(filepath));
                        }
                    }
                ]
            }
        },
        blanket: {
            tool: {
                src: ['tool/'],
                dest: 'coverage/tool/'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'xunit',
                    force: true,
                    /** Optionally suppress output to standard out (defaults to false) */
                    quiet: false,
                    /** Optionally clear the require cache before running tests (defaults to false) */
                    clearRequireCache: false,
                    reporterOptions: {
                        output: 'coverage/test-reports.xml'
                    },
                    timeout: 10000
                },
                src: ['coverage/test/**/*.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'htmlReports/coverage.html'
                },
                src: ['coverage/test/**/*.js']
            },
            'travis-cov': {
                options: {
                    reporter: 'travis-cov',
                    captureFile: 'coverage/coverageSum.txt'
                },
                src: ['coverage/test/**/*.js']
            }
        },
        file_modify: {
            options: {
                process: function (content, srcpath) {
                    /**
                     * 去掉console字样内容
                     */
                    return content.replace(/.*(Coverage.*)/gi, '$1');
                }
            },
            src: ['coverage/coverageSum.txt']
        },
        jsdoc: {
            dist: {
                src: ['tool/**/*.js', 'conf/**/*.js', 'log/**/*.js', '*.js'],
                options: {
                    destination: 'doc',
                    template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure: "conf/jsdoc.conf.json",
                    package: 'package.json',
                    recurse: true
                }
            },
            dist_test: {
                src: ['test/**/*.js'],
                options: {
                    destination: 'doc/test',
                    template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure: "conf/jsdoc.conf.test.json",
                    package: 'package.json',
                    recurse: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-blanket');
    grunt.loadNpmTasks('grunt-file-modify');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['clean', 'copy', 'blanket', 'jshint', 'mochaTest', 'file_modify', 'jsdoc']);
};