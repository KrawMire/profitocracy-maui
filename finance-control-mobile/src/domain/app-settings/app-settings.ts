import BillingPeriodSettings from "./components/biiling-period-settings"
import ExpenseCategoriesSettings from "./components/expense-categories-settings";
import ThemeSettings from "./components/theme-settings";
import ExpenseTypeSettings from "./components/expense-type-settings";

/**
 * All settings of the application
 */
type AppSettings = {
  /**
   * Period of the tracking expenses
   */
  billingPeriodSettings: BillingPeriodSettings;

  /**
   * Settings of the expenses types
   */
  expensesSettings: ExpenseTypeSettings[];

  /**
   * Theme settings
   */
  themeSettings: ThemeSettings;

  /**
   * Settings of the expenses categories
   */
  expenseCategoriesSettings: ExpenseCategoriesSettings
}

export default AppSettings;