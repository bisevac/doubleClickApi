export default ( data ) => {
  const index = data.findIndex( x => x[ 'Placement ID' ] === 'Placement ID' && x[ 'Ad ID' ] === 'Ad ID' );
  const result = data.slice( index + 1, data.length - 1 );
  return result;
};
