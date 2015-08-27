module.exports = function(grunt) {


  var cssSources = [
    'src/scss/*.scss',
    'src/scss/modules/*.scss',
    'src/scss/states/*.scss',
    'src/scss/base/*.scss',
    'src/scss/layout/*.scss'
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
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/css/style.css': 'src/scss/style.scss'
        }
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
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: ['*.html'],
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

  grunt.registerTask('default', ['watch']);

};