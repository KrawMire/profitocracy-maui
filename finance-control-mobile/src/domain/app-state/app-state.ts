import { BillingPeriodsState } from "./components/billing-periods-state";
import ExpensesState from "./components/expenses-state";
import AppSettingsState from "./components/app-settings-state";
import TotalBalanceState from "./components/total-balance-state";
import TransactionsState from "./components/transaction-state";
import GlobalState from "./components/global-state";
import CurrencyState from "./components/currency-state";

/**
 * Represents whole app state
 */
type AppState = {
  /**
   * Current state of global app parameters
   */
  globalState: GlobalState;

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

  /**
   * Current state of currencies
   */
  currencies: CurrencyState;
}

export default AppState;