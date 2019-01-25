let chai = require( "chai" );
let chaiAsPromised = require( "chai-as-promised" );

chai.use( chaiAsPromised );

describe( 'index.js', () => {

  describe( 'myFetch()', () => {
    let astronauts
    let results
    before( () => {
      window.fetch = require( 'node-fetch' )
    } );

    it( '1', async () => {
      astronauts = window.fetch( 'http://api.open-notify.org/astros.json' ).then( response => response.json() ).then( json => `${json[ "number" ]}` )
      results = myFetch( 'http://api.open-notify.org/astros.json' ).then( response => response.slice( response.indexOf( '"number":' ), response.indexOf( '"number":' ) + 12 ).match( /[0-9]+/ )[ 0 ] )
      await astronauts
      await results

      console.log( astronauts, results );
      expect( astronauts ).to.eql( results )
    } );
  } );

} );