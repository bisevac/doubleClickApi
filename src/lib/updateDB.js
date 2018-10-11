import mysql from 'mysql';

export default ( con, data ) => new Promise( ( resolve, reject ) => {
  console.log( 'Updating Datas...' );
  let str = '';
  let ids = '';
  data.forEach( ( item ) => {
    str += mysql.format( 'UPDATE  mediaplanline_ads SET click=? ,impression=? WHERE doubleClickPlacementId=?;',
      [item.Clicks, item.Impressions, item[ 'Placement ID' ]] );
    ids += `${item[ 'Placement ID' ]} - `;
  } );
  if ( !str.length ) {
    console.log( 'Query was Empty..' );
    return resolve();
  }
  return con.query( str, ( err, result ) => {
    if ( err ) {
      console.log( err );
      return reject( err );
    }
    console.log( `Updated Placement IDS ==> ${ids}` );
    return resolve();
  } );
} );
