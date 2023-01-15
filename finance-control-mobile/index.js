import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import React from 'react';
import { store, persistedtStore } from 'state/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './src/App';

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistedtStore}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

registerRootComponent(Root);
