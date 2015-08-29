module.exports = function (grunt){
  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  concat_css: {
    // options: {
    //   // Task-specific options go here. 
    // },
    all: {
      src: ["client/css/*.css"],
      dest: "build/production.css"
    },
  },

  cssmin: {
    target: {
      files: [{
        expand: true,
        cwd: 'build/', 
        src: ['production.css'],
        dest: 'build/',
        ext: '.min.css'
      }]
    }
  },


  imagemin: {
    dynamic: {
      files: [{
        expand: true,
        cwd: 'client/img/',
        src: ['*.{png,jpg,gif}'],
        dest: 'build/'
      }]
    }
  },

  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['server/**/*.js', 'client/js/*.js'],
      dest: 'build/production.js',
    },
  },
  // concat: {
  //   serverSide: {
  //     src: [
  //     'server/**/*.js',
  //     ],
  //     dest: 'server/build/serverProduction.js',
  //   },
  //   clientSide: {
  //     src: [
  //     'client/js/*.js',
  //     ],
  //     dest: 'client/build/clientProduction.js',
  //   }
  // },

  uglify: {
    serverSide: {
      src: 'build/production.js',
      dest: 'build/production.min.js'
    }
    // clientSide: {
    //   src: 'client/build/clientProduction.js',
    //   dest: 'client/build/clientProduction.min.js'
    // }
  },


  watch: {
    scripts: {
      files: [
        'client/**/*.js',
        'server/**/*.js'
      ],
      tasks: [
        'concat',
        'uglify'
      ],
      options: {
        livereload: true,
        spawn: false,
        event: ['added', 'changed', 'deleted']
      },
    }

  },

 }); //Closes initConfig

  //Tell grunt to use these plugins

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-jshint');

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
  grunt.registerTask('default', ['concat_css', 'cssmin', 'imagemin', 'concat', 'uglify', 'watch']);
  // grunt.registerTask('default', ['imagemin']);
  grunt.registerTask('build', ['concat']);
  //grunt.registerTask('default', ['mochaTest']); will replace with Jasmine if possible
};

