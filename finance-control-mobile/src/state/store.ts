import thunk from "redux-thunk";
import { initialAppState } from "./initial-state";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { appSettingsReducer } from "./app-settings/reducer";
import { billingPeriodsReducer } from "./billing-periods/reducer";
import { expensesReducer } from "./expenses/reducer";
import { totalBalanceReducer } from "./total-balance/reducer";
import { transactionsReducer } from "./transactions/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { GlobalActionTypes } from "./global/actions";
import { Action } from "./types";
import AppState from "src/domain/app-state/app-state";
import { globalAppReducer } from "./global/reducer";

const appReducer = combineReducers({
  billingPeriods: billingPeriodsReducer,
  expenses: expensesReducer,
  totalBalance: totalBalanceReducer,
  transactions: transactionsReducer,
  settings: appSettingsReducer,
  globalState: globalAppReducer
});

const rootReducer = (
  state: AppState = initialAppState,
  action: Action<any>
) => {
  if (action.type === GlobalActionTypes.Reset) {
    AsyncStorage.removeItem("persist:root");
    return appReducer({} as AppState, action);
  }

  return appReducer(state, action);
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  preloadedState: initialAppState,
  middleware: [thunk],
});

export const persistedtStore = persistStore(store);
