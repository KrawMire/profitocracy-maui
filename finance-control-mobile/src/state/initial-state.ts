import AppSettingsState from "src/domain/app-state/components/app-settings-state";
import ExpensesState from "src/domain/app-state/components/expenses-state";
import TotalBalanceState from "src/domain/app-state/components/total-balance-state";
import TransactionsState from "src/domain/app-state/components/transaction-state";
import ThemeSettings from "../domain/app-settings/components/theme-settings";
import { BillingPeriodsState } from "src/domain/app-state/components/billing-periods-state";
import AppState from "src/domain/app-state/app-state";

/**
 * Initial state of the app settings
 */
export const appSettingsInitialState: AppSettingsState = {
  settings: {
    billingPeriodSettings: {
      dateFrom: 0,
      dateTo: 0,
    },
    expensesSettings: [],
    themeSettings: ThemeSettings.Light,
    expenseCategoriesSettings: {
      categories: []
    }
  }
};

/**
 * Initial state of the billing periods
 */
export const billingPeriodsInitialState: BillingPeriodsState = {
  periods: []
};

/**
 * Initial state of the expenses
 */
export const expensesInitialState: ExpensesState = {
  expenses: []
};

/**
 * Initial state of the total balance
 */
export const totalBalanceInitialState: TotalBalanceState = {
  initialBalance: 0,
  actualBalance: 0
};

/**
 * Initial state of the transactions
 */
export const transactionsInitialState: TransactionsState = {
  transactions: []
};

/** Initial state of the whole application */
export const initialAppState: AppState = {
  transactions: transactionsInitialState,
  expenses: expensesInitialState,
  totalBalance: totalBalanceInitialState,
  billingPeriods: billingPeriodsInitialState,
  settings: appSettingsInitialState,
};