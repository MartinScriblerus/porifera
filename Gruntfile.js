module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "babel": {
      options: {
        sourceMap: true
      },
      
      dist: {
        files: {
          "web/dist/app.js": [
            "web/index.js",
            "web/pitchNode.js",
            "web/pitchProcessor.js",
            "web/setupAudio.js",
            "rust-node/pkg/*",
            "jslib/*"
          ]
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("2022-06-06") %> */\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      }
    }
  });



  // Load the plugin
  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};