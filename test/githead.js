var fs = require('fs')
  , request = require( 'request')
  , connect = require('connect')
  , http = require( 'http')
  , heartbeat = require(__dirname+'/../githead')
  , net = require('net')
  , sock = '/tmp/githead-test.sock'
  , getsha1 = require(__dirname+'/../lib/getsha1')
  
try{
  fs.unlinkSync( sock )
}catch(Ignore){ Ignore }

exports['Missing root directory argument throws an error'] = function (test) {
  test.expect( 1)
  test.throws( function () {
    heartbeat()
  }, 'githead() root path required', "should throw an error when no root path is given.")
  test.done()
}

exports['getsha1 module can fetch the git sha1'] = function (test) {
  test.expect( 1 )
  get = getsha1( __dirname+"/../" , function ( error, data ) {
    test.ok( !error, 'Gets a sha1!')
    test.done()
  })
}

exports['Calling an app endpoint twice should not call re-fetch the sha1'] = function ( test ) {
  test.expect( 1 )
  var app      = connect();
  var server = http.createServer( app )
  var shacalls = 0
  var getsha1 = function ( root, callback ) {
    shacalls++
    test.ok( shacalls===1, 'getsha1 called only once')
    callback( null, '1234567890ABCDEFGHIJKLMNOP') 
  }
  app.use( 
    heartbeat( { root: __dirname+"/../", getsha1: getsha1 } ) 
  ) 
  server.listen(5454)
  setTimeout( function () {
    console.log( 'get', "http://localhost:5454")
    request( "http://localhost:5454", function ( error, response, body ) {
      if( error ) return test.ok( false, error.message )
      request( "http://localhost:5454", function ( error, response, body ) {
        test.done()
        server.close()
      });
    })
  }, 1)
}

