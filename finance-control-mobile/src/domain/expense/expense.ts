import ExpenseType from "./components/expense-type";

/**
 * Represents planned expenses i.e. amount of money that is planned to spend
 */
type Expense = {
  /**
   * Identifier of the expense
   */
  id: string;

  /**
   * Identifier of the billing period
   */
  billingPeriod: string;

  /**
   * The name of the expense
   */
  name: string;

  /**
   * The current spent money amount
   */
  actualAmount: number;

  /**
   * The planned money amount to spend
   */
  plannedAmount: number;

  /**
   * Type of the expense. Could be main, secondary of postponed
   */
  expenseType: ExpenseType;
}

export default Expense;