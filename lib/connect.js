var getsha1 = require('./getsha1')
  , memorized = null;
  
/*
  Usage within connect/express:
  
  var hb = require('heartbeat');
  var git_project_root = __dirname;
  var app = require('connect').createServer()
  app.get( '/heartbeat', hb( git_project_root ) )
  
*/
module.exports = function ( options ) {
  var root = options.root||process.cwd();
  if( typeof options.getsha1 == 'function' ) getsha1 = options.getsha1;
  if( !root ) throw new Error('githead() root path required');
  return function ( req, res, next ) {
    if( memorized ){
      return res.end( JSON.stringify( memorized ) );
    }else{
      getsha1( root, function ( error, sha1 ) {
        if( error ){
          console.error( "[node-heartbeat]", error.message, error.stack||'' )
          return next( { error: "Cannot get system status." } );
        }else{
          memorized = {
            code: { sha1: sha1 , updated_at: new Date().toString() }
          }
          return res.end( JSON.stringify( memorized ) );
        }
      });
    };
  };
};

