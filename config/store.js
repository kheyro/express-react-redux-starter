import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from '../src/reducers/index';

export default ( initialState ) =>
  createStore( rootReducer, initialState, composeEnhancers( applyMiddleware( thunkMiddleware ) ) );