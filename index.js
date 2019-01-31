function myFetch( url ) {
  return new Promise( ( resolve, reject ) => {

    const xhr = new XMLHttpRequest();
    xhr.open( "GET", url );
    xhr.addEventListener( 'load', () => resolve( xhr.responseText ) );
    xhr.addEventListener( 'error', () => reject( new Error() ) )
    xhr.send();

  } );
}