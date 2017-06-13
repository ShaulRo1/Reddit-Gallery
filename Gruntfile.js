module.exports = function(grunt){
	grunt.initConfig({
		  cssmin: {
		  combine: {
			files: {
			  'style.min.css': ['browse_menu.css', 'gallery.css', 'header.css']
			}
		  }
		},
		  uglify: {
		  combine: {
			files: {
			  'script.min.js': ['jquery-3.2.1.min.js', 'gallery.js']
			}
		  }
		}
	});
		
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask("default", ['cssmin', 'uglify']);
};