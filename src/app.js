import delay from 'delay';
import config from './lib/config';
import getAccesToken from './lib/getAccesToken';
import mysql from './service/mysql';
import reportBuilder from './lib/reportInsert';
import reportRun from './lib/reportRun';
import getData from './lib/getData';
import getFile from './lib/getFile';
import dataFixed from './lib/dataFixed';
import updateDB from './lib/updateDB';
import deleteReport from './lib/reportDelete';
import log from './lib/log';

let connection = null;

const terminate = function terminate () {
  connection.end( ( err ) => {
    if ( err ) {
      console.log( err );
      // process.exit( 1 );
    } else {
      console.log( '[MYSQL] Database connection closed' );
      // process.exit( 0 );
    }
  } );
};
log();
config();


async function init () {
  try {
    const con = await mysql();
    connection = con;

    const data = await getData( con );
    await getAccesToken();
    await reportBuilder( data );
    await delay( 10000 );
    const file = await reportRun();
    await delay( 60000 );
    const result = await getFile( file.id );
    await deleteReport();
    const fixedResult = dataFixed( result );
    await updateDB( con, fixedResult );
    terminate();
  } catch ( error ) {
    console.log( 'Error', JSON.stringify( error, null, 2 ) );
    terminate();
  }
}

init();
setInterval( () => {
  init();
}, 1000 * 60 * 60 * 12 );
