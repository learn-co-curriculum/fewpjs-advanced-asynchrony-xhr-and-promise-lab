const sinon = require( 'sinon' )

describe( 'index.js', () => {

  describe( 'myFetch()', () => {
    let astronauts
    let results
    before( () => {
      el = {
        dataset: {
          repository: 'Spoon-Knife',
          username: 'octocat'
        }
      }
      xhr = sinon.useFakeXMLHttpRequest()
      window.XMLHttpRequest = xhr

      xhr.onCreate = function ( req ) {
        requests.push( req )
      }
    } );

    beforeEach( () => {
      requests = []
    } )

    after( () => {
      requests = []
      xhr.restore()
    } )

    it( 'accepts one argument - the URL to use in our XHR request', () => {
      expect( requests.length ).to.eql( 0 )
      results = myFetch( 'https://api.reddit.com' )
      expect( requests.length ).to.eql( 1 )
      expect( requests[ 0 ][ 'url' ] ).to.eql( 'https://api.reddit.com' )
    } );

    it( 'sends a XHR GET request', () => {
      results = myFetch( 'https://api.reddit.com' )
      expect( requests[ 0 ][ 'method' ] ).to.eql( 'GET' )
    } )

    it( 'uses XMLHttpRequest(), not fetch()', () => {
      expect( myFetch.toString() ).to.match( /XMLHttpRequest\((.*?)\)/ );
      expect( myFetch.toString(), 'the fetch() function was found in myFetch()' ).to.not.match( /fetch\((.*?)\)/ );
    } )

    it( 'returns a Promise, complete with a then() function', () => {
      expect( typeof myFetch( 'https://api.reddit.com' ).then ).to.eql( 'function' )
    } )

    it( 'returns a Promise that, once resolved, becomes the returned XHR data', async () => {

      let testPromise = myFetch( 'https://api.reddit.com' )
      requests[ 0 ].respond(
        200, {
          'Content-Type': 'application/json'
        },
        JSON.stringify( {
          test: "okay"
        } )
      );

      const result = await testPromise
      expect( result ).to.eql( '{"test":"okay"}' )

    } );


    it( 'returns a Promise that, if rejected, becomes a new Error', async () => {
      let testPromise = myFetch( 'https://api.reddit.com' ).catch( error => error );
      requests[ 0 ].error()

      const result = await testPromise
      expect( result ).to.be.an( 'error' )

    } );
  } );

} );