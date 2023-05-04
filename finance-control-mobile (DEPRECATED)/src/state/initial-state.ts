import "react-native-get-random-values";
import AppSettingsState from "src/domain/app-state/components/app-settings-state";
import ExpensesState from "src/domain/app-state/components/expenses-state";
import TotalBalanceState from "src/domain/app-state/components/total-balance-state";
import TransactionsState from "src/domain/app-state/components/transaction-state";
import ThemeSettings from "../domain/app-settings/components/theme-settings";
import AppState from "src/domain/app-state/app-state";
import ExpenseType from "../domain/expense/components/expense-type";
import GlobalState from "src/domain/app-state/components/global-state";
import CurrencyState from "../domain/app-state/components/currency-state";
import AnchorDatesState from "domain/app-state/components/anchor-dates-state";

/**
 * Initial state of the app settings
 */
export const appSettingsInitialState: AppSettingsState = {
  settings: {
    anchorDatesSettings: {
      days: [],
    },
    expensesSettings: [
      {
        expenseType: ExpenseType.Main,
        percent: 50,
      },
      {
        expenseType: ExpenseType.Secondary,
        percent: 30,
      },
      {
        expenseType: ExpenseType.Postponed,
        percent: 20,
      },
    ],
    themeSettings: ThemeSettings.Light,
    expenseCategoriesSettings: {
      categories: [],
    },
  },
};

/**
 * Initial state of the anchor dates
 */
export const anchorDatesInitialState: AnchorDatesState = {
  dates: [],
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
    },
    {
      expenseType: ExpenseType.Secondary,
      name: "Secondary expenses",
      actualAmount: 0,
      plannedAmount: 0,
    },
    {
      expenseType: ExpenseType.Postponed,
      name: "Postponed",
      actualAmount: 0,
      plannedAmount: 0,
    },
  ],
};

/**
 * Initial state of the total balance
 */
export const totalBalanceInitialState: TotalBalanceState = {
  initialBalance: 0,
};

/**
 * Initial state of the transactions
 */
export const transactionsInitialState: TransactionsState = {
  transactions: [],
};

/**
 * Initial state of the app currencies state
 */
export const currencyInitialState: CurrencyState = {
  baseCurrency: {
    name: "US Dollar",
    code: "USD",
    symbol: "$",
  },
  availableCurrencies: [
    {
      currency: {
        name: "US Dollar",
        code: "USD",
        symbol: "$",
      },
      rate: 0,
    },
    {
      currency: {
        name: "Russian Ruble",
        code: "RUB",
        symbol: "₽",
      },
      rate: 81.55,
    },
    {
      currency: {
        name: "Euro",
        code: "EUR",
        symbol: "€",
      },
      rate: 0.9,
    },
    {
      currency: {
        name: "Armenian dram",
        code: "AMD",
        symbol: "֏",
      },
      rate: 390.97,
    },
    {
      currency: {
        name: "Chinese Yuan",
        code: "CNY",
        symbol: "¥",
      },
      rate: 6.87,
    },
  ],
};

/**
 * Initial state of the global variables
 */
export const globalInitialState: GlobalState = {
  isSetUp: false,
};

/**
 * Initial state of the whole application
 */
export const initialAppState: AppState = {
  transactions: transactionsInitialState,
  expenses: expensesInitialState,
  totalBalance: totalBalanceInitialState,
  anchorDates: anchorDatesInitialState,
  settings: appSettingsInitialState,
  currencies: currencyInitialState,
  globalState: globalInitialState,
};
