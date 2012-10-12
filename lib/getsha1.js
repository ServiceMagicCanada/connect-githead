var child_process = require( 'child_process');

module.exports = function ( root, callback ) { 
  var child  = child_process.spawn( 'git', [ 'rev-parse', 'HEAD' ], { cwd: root } )
  if( typeof callback === 'function'){
    var buffer = []
      , error  = null;
    child.stdout.on( 'data', function ( data ) { 
      buffer.push( data );
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
module.exports( __dirname + "/../", function () {
  console.log( arguments )
} )
  
// var getRoot = function ( root ) { return root||process.cwd() }
// var getSha = function ( callback ) {
//   
// }
// readSHA = child_process.spawn( 'git', [ 'rev-parse', 'HEAD' ] )
// 
// readSHA.stdout.on('data', function (sha) {
//   console.log('stdout: ' + sha);
// });
// 
// readSHA.stderr.on('data', function (data) {
//   console.log('stderr: ' + data);
// });
// 
// readSHA.on('exit', function (code) {
//   console.log('child process exited with code ' + code);
// });