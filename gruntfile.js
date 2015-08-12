module.exports = function (grunt){
  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  cssmin: {
    target: {
      files: [{
        expand: true,
        cwd: 'client/css/',
        src: ['*.css'],
        dest: 'client/css/',
        ext: '.min.css'
      }]
    }
  },

  concat: {
    dist: {
      src: [
      'server/**/*.js',
      ],
      dest: 'server/build/production.js',
    },
    dist: {
      src: [
      'client/js/*.js',
      ],
      dest: 'client/build/production.js',
    }
  },

  uglify: {
    build: {
      src: 'server/build/production.js',
      dest: 'server/build/production.min.js'
    },
    build: {
      src: 'client/build/production.js',
      dest: 'client/build/production.min.js'
    }
  },

  imagemin: {
    dynamic: {
      files: [{
        expand: true,
        // cwd: 'client/img/',
        src: ['client/img/*.jpg'],
        dest: 'client/img/build'
      }]
    }
  },

  watch: {
    options: {
      livereload: true,
    },
    scripts: {
      files: [
        'client/js/*.js',
        'server/**/*.js'
      ],
      tasks: [
        'concat',
        'uglify'
      ],
      options: {
        spawn: false,
      },
    }

  },

 }) //Closes initConfig

  //Tell grunt to use these plugins
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('server-dev', function (target) {
  // Running nodejs in a different process and displaying output on the main console
  var nodemon = grunt.util.spawn({
       cmd: 'grunt',
       grunt: true,
       args: 'nodemon'
  });
  nodemon.stdout.pipe(process.stdout);
  nodemon.stderr.pipe(process.stderr);

  grunt.task.run([ 'watch' ]);
});



  //what happens when you type grunt in CL

  grunt.registerTask('default', ['cssmin', 'uglify', 'imagemin', 'concat', 'watch']);//'watch'
  grunt.registerTask('build', ['concat']);
  //grunt.registerTask('default', ['mochaTest']);
};

