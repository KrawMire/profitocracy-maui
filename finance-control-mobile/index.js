import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import App from './src/App';
import { getStore } from 'appState/store';

const Root = () => {
  const store = getStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

registerRootComponent(Root);
