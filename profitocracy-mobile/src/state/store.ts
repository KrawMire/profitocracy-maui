import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

import { GlobalActionTypes } from "state/global/actions";
import { AppState } from "state/app-state";
import { initialAppState } from "state/initial-state";
import { Action } from "state/state-types";

import { anchorDatesReducer } from "state/anchor-dates/reducer";
import { categoriesReducer } from "state/categories/reducer";
import { currencyRatesReducer } from "state/currency-rates/reducer";
import { settingsReducer } from "state/settings/reducer";
import { transactionsReducer } from "state/transactions/reducer";
import { savedBalanceReducer } from "state/saved-balance/reducer";
import { mainBalanceReducer } from "state/main-balance/reducer";

const appReducer = combineReducers({
  anchorDates: anchorDatesReducer,
  categories: categoriesReducer,
  currencyRates: currencyRatesReducer,
  settings: settingsReducer,
  transactions: transactionsReducer,
  savedBalance: savedBalanceReducer,
  mainBalance: mainBalanceReducer,
});

const rootReducer = (state: AppState = initialAppState, action: Action<never>) => {
  if (action.type === GlobalActionTypes.Reset) {
    AsyncStorage.removeItem("persist:root");
    return appReducer(initialAppState, action);
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
