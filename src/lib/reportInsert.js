import axios from 'axios';

export default function ReportInsert ( data ) {
  return new Promise( ( resolve, reject ) => {
    const dimensionFilters = [];
    const startDate = data[ 1 ][ 0 ].date;
    data[ 0 ].forEach( ( item ) => {
      dimensionFilters.push( {
        dimensionName : 'dfa:placement',
        kind          : 'dfareporting#dimensionValue',
        id            : item.doubleClickPlacementId,
        matchType     : 'EXACT',
      } );
    } );
    return axios.request( {
      method  : 'post',
      url     : `https://www.googleapis.com/dfareporting/v3.1/userprofiles/${$config.user.profileId}/reports`,
      headers : {
        Authorization  : $config.doubleclick.access_token,
        'Content-Type' : 'application/json',
      },
      data :
        {
          name     : 'HoliReport',
          type     : 'STANDARD',
          format   : 'CSV',
          kind     : 'dfareporting#report',
          criteria : {
            dimensions : [
              {
                kind      : 'dfareporting#sortedDimension',
                name      : 'dfa:placementId',
                sortOrder : 'ASCENDING',
              },
              {
                kind : 'dfareporting#sortedDimension',
                name : 'dfa:adId',
              },
            ],
            metricNames : [
              'dfa:clicks',
              'dfa:impressions',
            ],
            dateRange : {
              startDate,
              endDate : '2018-7-13',
              kind    : 'dfareporting#dateRange',
            },
            dimensionFilters,
          },
        },
    } ).then( ( response ) => {
      $config.user.reportId = response.data.id;
      console.log( `Report Created ReportId ==> ${response.data.id}` );
      resolve();
    } ).catch( ( err ) => {
      console.log( 'Error', JSON.stringify( err.response.data, null, 2 ) );
      reject( err.response.data );
    } );
  } );
}
