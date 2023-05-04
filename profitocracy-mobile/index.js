import "react-native-get-random-values";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./src/app";
import { registerRootComponent } from "expo";
import { persistedStore, store } from "state/store";

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
      <App />
    </PersistGate>
  </Provider>
);

registerRootComponent(Root);
