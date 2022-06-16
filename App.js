import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers/index';
import Main from './src/screens/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = props => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
