import axios from 'axios';

export default () => new Promise( ( resolve, reject ) => {
  axios.request( {
    method : 'DELETE',
    url    : `https://www.googleapis.com/dfareporting/v3.1/userprofiles/${$config.user.profileId}/reports/${$config.user.reportId}`,
    data   : {
    },
    headers : {
      'Content-Type' : 'application/json',
      Authorization  : $config.doubleclick.access_token,
    },
  } ).then( ( response ) => {
    console.log( 'Report Deleted!' );
    resolve( response.data );
  } ).catch( ( error ) => {
    console.log( 'Error', JSON.stringify( error.response.data, null, 2 ) );
    reject( error.response.data );
  } );
} );
