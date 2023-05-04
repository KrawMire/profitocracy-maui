import thunk from "redux-thunk";
import { initialAppState } from "./initial-state";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { appSettingsReducer } from "./app-settings/reducer";
import { expensesReducer } from "./expenses/reducer";
import { totalBalanceReducer } from "./total-balance/reducer";
import { transactionsReducer } from "./transactions/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { GlobalActionTypes } from "./global/actions";
import { Action } from "./types";
import AppState from "src/domain/app-state/app-state";
import { globalAppReducer } from "./global/reducer";
import { currencyReducer } from "state/currency/reducer";
import { anchorDatesReducer } from "state/anchor-dates/reducer";

const appReducer = combineReducers({
  anchorDates: anchorDatesReducer,
  expenses: expensesReducer,
  totalBalance: totalBalanceReducer,
  transactions: transactionsReducer,
  settings: appSettingsReducer,
  globalState: globalAppReducer,
  currencies: currencyReducer,
});

const rootReducer = (state: AppState = initialAppState, action: Action<never>): AppState => {
  if (action.type === GlobalActionTypes.Reset) {
    AsyncStorage.removeItem("persist:root");
    return appReducer({} as AppState, action);
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  preloadedState: initialAppState,
  middleware: [thunk],
});

export const persistedStore = persistStore(store);
