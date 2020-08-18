import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';

let store = configureStore();
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
