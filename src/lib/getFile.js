import axios from 'axios';
import csv from 'csvtojson';


export default id => new Promise( ( resolve, reject ) => {
  console.log( 'Getting File...' );
  return axios.request( {
    method       : 'get',
    url          : `https://www.googleapis.com/dfareporting/v3.1/reports/${$config.user.reportId}/files/${id}?alt=media`,
    responseType : 'buffer',
    headers      : {
      Authorization : $config.doubleclick.access_token,
    },
  } ).then( ( response ) => {
    csv( {
      headers : ['Placement ID', 'Ad ID', 'Clicks', 'Impressions'],
      output  : 'json',
    } )
      .fromString( response.data )
      .then( ( result ) => {
        console.log( 'File Received' );
        resolve( result );
      } );
  } ).catch( ( error ) => {
    console.log( 'Error', JSON.stringify( error.response.data, null, 2 ) );
    reject( error.response.data );
  } );
} );
