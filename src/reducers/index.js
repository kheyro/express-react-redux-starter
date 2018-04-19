import { combineReducers } from 'redux';

const dataReducer = ( state = [ ], action ) => {
  switch ( action.type ) {
    case "STORE_DATA":
      return action.data;
    default: return state;
  }
};

const sessionReducer = ( state = false, action ) => {
  switch ( action.type ) {
    case "INITIALIZE_SESSION":
      return true;
    default: return state;
  }
};

const rootReducer = combineReducers({
  loggedIn: sessionReducer,
  data: dataReducer,
});

export default rootReducer;