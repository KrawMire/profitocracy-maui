import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { expensesReducer } from "./expenses/reducers";
import { ExpensesState } from "./expenses/types";
import { totalReducer } from "./total/reducers";
import { TotalState } from "./total/types";
import { transactionsReducer } from "./transactions/reducers";
import { TransactionsState } from "./transactions/types"

export interface AppGlobalState {
  transactions: TransactionsState;
  expenses: ExpensesState;
  total: TotalState;
}

export async function getStore() {
  const rootReducer = combineReducers({
    transactions: transactionsReducer,
    expenses: expensesReducer,
    total: totalReducer,
  });

  const state = await loadState();

  return configureStore({
    reducer: rootReducer,
    preloadedState: state
  });
}

async function loadState() {
  const total = await AsyncStorage.getItem("PERIOD_SUM");
  const expensesJson = await AsyncStorage.getItem("EXPENSES");
  const expenses = expensesJson ? JSON.parse(expensesJson) : [];

  let totalSum: number;

  if (total) {
    totalSum = parseFloat(total);
  } else {
    totalSum = 0;
  }

  return {
    expenses: expenses,
    total: parseFloat(total ?? "0")
  }
}