import ExpenseCategoriesSettings from "./components/expense-categories-settings";
import ThemeSettings from "./components/theme-settings";
import ExpenseTypeSettings from "./components/expense-type-settings";
import AnchorDatesSettings from "domain/app-settings/components/anchor-days-settings";

/**
 * All settings of the application
 */
interface AppSettings {
  /**
   * Contain list of anchor dates
   */
  anchorDatesSettings: AnchorDatesSettings;

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
  expenseCategoriesSettings: ExpenseCategoriesSettings;
}

export default AppSettings;
