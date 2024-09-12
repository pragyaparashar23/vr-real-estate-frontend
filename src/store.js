// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import {thunk} from 'redux-thunk';
// import authReducer from './reducers/authReducer';
// import propertyReducer from './reducers/propertyReducer';
// import tourReducer from './reducers/tourReducer';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   properties: propertyReducer,
//   tours: tourReducer,
// });

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import AuthReducer from './reducers/authReducer';
import PropertyReducers from './reducers/propertyReducer';
import TourReducers from './reducers/tourReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  properties: PropertyReducers,
  tours: TourReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
