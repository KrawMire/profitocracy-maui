import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { appSettingsReducer } from "./app-settings/reducer";
import { billingPeriodsReducer } from "./billing-periods/reducer";
import { expensesReducer } from "./expenses/reducer";
import { totalBalanceReducer } from "./total-balance/reducer";
import { transactionsReducer } from "./transactions/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  billingPeriods: billingPeriodsReducer,
  expenses: expensesReducer,
  totalBalance: totalBalanceReducer,
  transactions: transactionsReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: [thunk]
});

export const persistedtStore = persistStore(store);
