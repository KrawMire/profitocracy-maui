import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import App from './src/App';
import { getStore } from 'appState/store';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

const Root = () => {
  const [store, setStore] = useState(null);

  getStore().then(loadedStore => {
    setStore(loadedStore);
  });

  if (!store) {
    return (
      <ActivityIndicator size="large"/>
    )
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

registerRootComponent(Root);
