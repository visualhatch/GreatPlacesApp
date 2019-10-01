import React from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

import { init } from "./helpers/db";

import { StyleSheet } from 'react-native';

import PlacesNavigator from "./navigation/PlacesNavigator";
import places from "./store/reducers/places";

init().then(() => {
    console.log('Initalized Database');
}).catch(err => {
    console.log('Error creating database');
    console.log(err)
    }
);

const rootReducer = combineReducers({
  places: places
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
      <Provider store={store}>
        <PlacesNavigator/>
      </Provider>
  );
};
