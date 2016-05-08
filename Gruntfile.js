module.exports = function(grunt) {


  var cssSources = [
    'src/scss/**/*.scss'
  ];

  var htmlSources = [
    'src/*.html'
  ];


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: 'src/js/*.js',
        dest: 'dist/js/scripts.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/scripts.min.js': ['dist/js/scripts.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'dist/css/style.css': 'src/scss/style.scss'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html',
          'dist/blogs.html': 'src/blogs.html',
          'dist/code.html': 'src/code.html',
          'dist/utilities.html': 'src/utilities.html',
          'dist/404.html': 'src/404.html'
        }
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('pixrem')(),                                    // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          require('cssnano')()                                    // minify the result
        ]
      },
      dist: {
        src: 'dist/css/style.css',
        dest: 'dist/css/style.min.css'
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: cssSources,
        tasks: ['sass', 'postcss'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: htmlSources,
        tasks: ['htmlmin'],
        options: {
          livereload: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['watch']);

};