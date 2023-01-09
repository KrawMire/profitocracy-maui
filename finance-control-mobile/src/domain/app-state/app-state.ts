import { BillingPeriodsState } from "./components/billing-periods-state";
import ExpensesState from "./components/expenses-state";
import AppSettingsState from "./components/app-settings-state";
import TotalBalanceState from "./components/total-balance-state";
import TransactionsState from "./components/transaction-state";

/**
 * Represents whole app state
 */
type AppState = {
  /**
   * Current state of transactions
   */
  transactions: TransactionsState;

  /**
   * Current state of expenses
   */
  expenses: ExpensesState;

  /**
   * Current state of total balance
   */
  totalBalance: TotalBalanceState;

  /**
   * Current state of app settings
   */
  settings: AppSettingsState;

  /**
   * Current state of billing periods
   */
  billingPeriods: BillingPeriodsState;
}

export default AppState;