import fs from 'fs';
import util from 'util';
import path from 'path';

export default () => {
  const p = path.resolve( __dirname, '../../log/adlogs.log' );
  const logFile = fs.createWriteStream( p, { flags : 'a' } );
  const logStdout = process.stdout;

  console.log = function log ( d ) { //
    logFile.write( `${util.format( d )}\n` );
    logStdout.write( `${util.format( d )}\n` );
  };
  console.log( '==> DOUBLE CLICK READER STARTING <== ' );

  return new Promise( ( resolve ) => {
    resolve();
  } );
};
