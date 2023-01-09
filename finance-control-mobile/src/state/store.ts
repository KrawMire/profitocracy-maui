import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { appSettingsReducer } from "./app-settings/reducer";
import { billingPeriodsReducer } from "./billing-periods/reducer";
import { expensesReducer } from "./expenses/reducer";
import { totalBalanceReducer } from "./total-balance/reducer";
import { transactionsReducer } from "./transactions/reducer";

const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
  billingPeriods: billingPeriodsReducer,
  expenses: expensesReducer,
  totalBalance: totalBalanceReducer,
  transactions: transactionsReducer
});

export const getStore = () => configureStore({
  reducer: rootReducer
});