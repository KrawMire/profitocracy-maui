import ExpenseCategory from "src/domain/expense-category/expense-category";

/**
 * Settings of the expense categories
 */
interface ExpenseCategoriesSettings {
  /**
   * Available categories of the expenses
   */
  categories: ExpenseCategory[];
}

export default ExpenseCategoriesSettings;
