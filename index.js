import { AppRegistry } from 'react-native';

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Import the reducer and create a store

import getStore from './src/store/store';
// Import the App container component
import App from './App';

// Pass the store into the Provider
console.disableYellowBox = true;

const AppWithStore = () => (
  <Provider store={getStore()}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('DayMKR', () => AppWithStore);
