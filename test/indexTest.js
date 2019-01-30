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
      results = myFetch( 'http://api.open-notify.org/astros.json' )
      expect( requests.length ).to.eql( 1 )
      expect( requests[ 0 ][ 'url' ] ).to.eql( 'http://api.open-notify.org/astros.json' )
    } );

    it( 'sends a XHR GET request', () => {
      results = myFetch( 'http://api.open-notify.org/astros.json' )
      expect( requests[ 0 ][ 'method' ] ).to.eql( 'GET' )
    } )

    it( 'uses XMLHttpRequest(), not fetch()', () => {
      expect( myFetch.toString() ).to.match( /XMLHttpRequest\((.*?)\)/ );
      expect( myFetch.toString(), 'the fetch() function was found in myFetch' ).to.not.match( /fetch\((.*?)\)/ );
    } )

    it( 'returns a Promise, complete with a then() function', () => {
      expect( typeof myFetch( 'http://api.open-notify.org/astros.json' ).then ).to.eql( 'function' )
    } )
  } );

} );