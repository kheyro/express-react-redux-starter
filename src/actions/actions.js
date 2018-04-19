import { fetchCircuits } from "../api";

const storeData = ( data ) => ( {
  type: "STORE_DATA",
  data,
} );

export const fetchData = ( ) => ( dispatch ) =>
  fetchCircuits( ).then( res => dispatch( storeData( res ) ) );