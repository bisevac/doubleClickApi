export default async _con => new Promise( ( resolve, reject ) => {
  const queryString = 'SELECT ads.id, ads.doubleClickPlacementId  FROM mediaplanline_ads ads '
  + ' JOIN mediaplanline mp ON mp.id=ads.mediaplanlineId'
  + ' WHERE sync=1 AND type=2'
  + ' AND mp.startDate <= NOW( ) AND NOW() <= DATE_ADD(mp.endDate, INTERVAL 7 DAY);'
  + ' SELECT DATE_FORMAT(MIN(mp.startDate),\'%Y-%m-%d\')  AS date FROM mediaplanline_ads ads'
  + ' JOIN mediaplanline mp ON mp.id=ads.mediaplanlineId'
  + ' WHERE sync=1 AND type=2 AND mp.startDate <= NOW( ) AND NOW() <= DATE_ADD(mp.endDate, INTERVAL 7 DAY);';

  return _con.query( queryString, ( err, result ) => {
    if ( err ) {
      console.log( err );
      return reject( err );
    }
    if ( result[ 0 ].length === 0 ) {
      console.log( new Error( 'Dont Have Data For Sync !!! ' ) );
      return reject();
    }
    console.log( `==> DATA FOR EDITING DATE : ${new Date()} <==` );
    console.log( `${JSON.stringify( result )}\n` );
    resolve( result );
  } );
} );
