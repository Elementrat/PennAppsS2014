module.exports = function (grunt) {
  grunt.initConfig({
  	watch : {
  		all : {
  			files    : ["app/**/*.js","app/**/*.html", "app/**/*.css"],
  			options  : { livereload : true },
  		},
    }

  }); 
  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.registerTask('default', ['watch']);
}
