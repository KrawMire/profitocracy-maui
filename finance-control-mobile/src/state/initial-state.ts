import AppSettingsState from "src/domain/app-state/components/app-settings-state";
import ExpensesState from "src/domain/app-state/components/expenses-state";
import TotalBalanceState from "src/domain/app-state/components/total-balance-state";
import TransactionsState from "src/domain/app-state/components/transaction-state";
import ThemeSettings from "../domain/app-settings/components/theme-settings";
import { BillingPeriodsState } from "src/domain/app-state/components/billing-periods-state";
import AppState from "src/domain/app-state/app-state";
import ExpenseType from "../domain/expense/components/expense-type";
import { getNewId } from "utils/identifier";
import "react-native-get-random-values";
import GlobalState from "src/domain/app-state/components/global-state";

/**
 * Initial state of the app settings
 */
export const appSettingsInitialState: AppSettingsState = {
  settings: {
    billingPeriodSettings: {
      dateFrom: 0,
      dateTo: 0,
    },
    expensesSettings: [
      {
        expenseType: ExpenseType.Main,
        percent: 50
      },
      {
        expenseType: ExpenseType.Secondary,
        percent: 30
      },
      {
        expenseType: ExpenseType.Postponed,
        percent: 20
      },
    ],
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
  expenses: [
    {
      expenseType: ExpenseType.Main,
      name: "Main expenses",
      actualAmount: 0,
      plannedAmount: 0,
      billingPeriod: null,
    },
    {
      expenseType: ExpenseType.Secondary,
      name: "Secondary expenses",
      actualAmount: 0,
      plannedAmount: 0,
      billingPeriod: null,
    },
    {
      expenseType: ExpenseType.Postponed,
      name: "Postponed",
      actualAmount: 0,
      plannedAmount: 0,
      billingPeriod: null,
    }
  ]
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


export const globalInitialState: GlobalState = {
  isSetUp: false
};

/**
 * Initial state of the whole application
 */
export const initialAppState: AppState = {
  transactions: transactionsInitialState,
  expenses: expensesInitialState,
  totalBalance: totalBalanceInitialState,
  billingPeriods: billingPeriodsInitialState,
  settings: appSettingsInitialState,
  globalState: globalInitialState
};