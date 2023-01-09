import Expense from "src/domain/expense/expense";

/**
 * Represents state of the existing expnses
 */
type ExpensesState = {
  /**
   * Current expenses
   */
  expenses: Expense[];
}

export default ExpensesState;