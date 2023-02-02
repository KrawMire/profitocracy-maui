import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { store, persistedtStore } from 'state/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './src/App';
import LoadingView from './src/ui/components/shared/loading';
import 'react-native-get-random-values';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingView />} persistor={persistedtStore}>
      <App />
    </PersistGate>
  </Provider>
)

registerRootComponent(Root);
