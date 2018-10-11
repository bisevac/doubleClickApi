import axios from 'axios';

export default () => new Promise( ( resolve, reject ) => {
  console.log( 'Report Running...' );
  axios.request( {
    method : 'post',
    url    : `https://www.googleapis.com/dfareporting/v3.1/userprofiles/${$config.user.profileId}/reports/${$config.user.reportId}/run`,
    data   : {
    },
    headers : {
      'Content-Type' : 'application/json',
      Authorization  : $config.doubleclick.access_token,
    },
  } ).then( ( response ) => {
    console.log( `Report File Created fileId ===> ${response.data.id}` );
    resolve( response.data );
  } ).catch( ( error ) => {
    console.log( 'Error', JSON.stringify( error.response.data, null, 2 ) );
    reject( error.response.data );
  } );
} );
