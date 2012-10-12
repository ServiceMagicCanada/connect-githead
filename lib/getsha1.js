var child_process = require( 'child_process');

module.exports = function ( root, callback ) { 
  var child  = child_process.spawn( 'git', [ 'rev-parse', 'HEAD' ], { cwd: root } )
  if( typeof callback === 'function'){
    var buffer = []
      , error  = null;
    child.stdout.on( 'data', function ( data ) { 
      buffer.push( String(data).trim() );
    })
    child.stderr.on( 'data', function ( data ) {
      error = data
    })
    child.on( 'exit', function( code ) {
      if( error !== null ){
        callback( { code: code, error: error.toString() } )
      }else{
        callback( null, buffer.join('') )
      }
    });    
  }
  return child;
}
