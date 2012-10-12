# connect-githead

A connect middleware that reads the `git rev-parse HEAD` SHA1 signature and outputs it as json with a timestamp.


Output JSON is like:

		{ 
		  "code":  { 
		     "sha1" : "acdfcb628f95cd5fca8a15c3cb328d78c1050673", // git sha1 of current project specified at "root" 
		     "updated_at" : "2012-10-12 09:32:44 -0400"// rfc 2822 timestamp when this object was created
		   }
		}
		
To use as middleware for a specific endpoint, in connect/express do this: 

	  var hb = require('heartbeat');
	  var git_project_root = __dirname;
	  var app = require('connect').createServer()
	  app.get( '/heartbeat', hb( git_project_root ) )

