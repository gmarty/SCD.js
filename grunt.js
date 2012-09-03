module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-closure-compiler');

  // Project configuration.
  grunt.initConfig({
    'closure-compiler': {
      // Production script
      debug: {
        js: [
          'js/EventEmitter.js',
          'js/scd.js',
          'js/exports.js'
        ],
        jsOutputFile: 'min/scd.min.js',
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5_STRICT',
          summary_detail_level: 3,
          warning_level: 'VERBOSE',
          define: [
            '"DEBUG=true"'
          ]
        }
      },

      // Debug script
      no_debug: {
        js: '<config:closure-compiler.debug.js>',
        jsOutputFile: 'min/scd.min-nodebug.js',
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5_STRICT',
          summary_detail_level: 3,
          warning_level: 'VERBOSE',
          define: [
            '"DEBUG=false"'
          ]
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', 'closure-compiler:debug closure-compiler:no_debug');

};
