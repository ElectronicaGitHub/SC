var autoprefixer = require('autoprefixer-core');

module.exports = function (grunt) {

  grunt.initConfig ({
    watch: {
      styles: {
        files: ['public/stylesheets/*.scss'],
        tasks: [
          'sass', 
          'postcss'
          // 'autoprefixer'
        ],
        options: {
          spawn: false,
        },
      },
    },
    sass: {
      dist: {
        files: [{
          expand : true,
          cwd : 'public/stylesheets',
          src : ['*.scss'],
          dest : 'public/stylesheets',
          ext : '.css'
        }]
      }
    },
    postcss: {
        options: {
            processors: [
              autoprefixer({ browsers: ['last 5 version'] }).postcss
            ]
        },
        dist: { src: 'public/stylesheets/*.css' }
    },
    // autoprefixer : {
    //   diff: {
    //     options: {
    //         diff: true,
    //         browsers: ['last 5 versions']
    //     },
    //     src: 'public/stylesheets/*.css'
    //   }
    // },
    cssmin: {
        my_target: {
            files: [{
                expand: true,
                cwd: 'public/stylesheets',
                src: ['*.css', '!*.min.css'],
                dest: 'public/prebuild/css',
                ext: '.css'
            }]
        }
    },
    uglify: {
        options: {
            compress : {
                drop_console : true
            }
        },
        my_target: {
            files: [{
                expand : true,
                cwd: 'public/javascripts',
                src : '*.js',
                dest : 'public/prebuild/js'
            }]
        }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/prebuild/js/*.js'],
        dest: 'public/build/webterror.js'
      },
      options: {
        separator: ''
      },
      dist2: {
        src: [
          'public/prebuild/css/main.css', 
          'public/prebuild/css/lato.css', 
          'public/prebuild/css/glitch.css'
        ],
        dest: 'public/build/webterror.css'
      }
    }
  });

  // Load NPM Tasks
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');
// grunt.loadNpmTasks('grunt-autoprefixer');
// grunt.loadNpmTasks('grunt-contrib-uglify');
// grunt.loadNpmTasks('grunt-contrib-cssmin');
// grunt.loadNpmTasks('grunt-contrib-concat');
// grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default Task Validates Less and Builds CSS for dist
  grunt.registerTask("default", [
    'sass',
    'postcss'
    // 'autoprefixer', 
    // 'uglify', 
    // 'cssmin', 
    // 'concat'
    ]
  );
};
