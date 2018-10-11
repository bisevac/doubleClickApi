import axios from 'axios';
import querystring from  'querystring';

export default async () => new Promise( ( resolve, reject ) => axios.request( {
  method  : 'post',
  baseURL : 'https://www.googleapis.com',
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded',
  },
  url  : '/oauth2/v4/token',
  data : querystring.stringify( {
    client_secret : $config.doubleclick.client_secret,
    grant_type    : 'refresh_token',
    client_id     : $config.doubleclick.client_id,
    refresh_token : $config.doubleclick.refresh_token,
  } ),
} ).then( ( response ) => {
  $config.doubleclick.access_token = `Bearer ${response.data.access_token}`;
  console.log( `Get Acces Token ==> Bearer ${response.data.access_token}` );
  resolve();
} ).catch( ( error ) => {
  console.log( 'Error', JSON.stringify( error.response.data, null, 2 ) );
  reject( error.response.data );
} ) );
