import Expense from "src/domain/expense/expense";

/**
 * Represents state of the existing expenses
 */
type ExpensesState = {
  /**
   * Current expenses
   */
  expenses: Expense[];
}

export default ExpensesState;