import ExpenseType from "src/domain/expense/components/expense-type";

/**
 * Settings of the expenses type
 */
interface ExpenseTypeSettings {
  /**
   * Type of the expense
   */
  expenseType: ExpenseType;

  /**
   * Percentage of the expense
   */
  percent: number;
}

export default ExpenseTypeSettings;
