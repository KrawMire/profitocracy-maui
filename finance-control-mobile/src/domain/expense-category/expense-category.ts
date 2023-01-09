/**
 * Category of expenses
 */
type ExpenseCategory = {
  /**
   *  Identifier of expense category
   */
  id: string;

  /**
   * The name of category
   */
  name: string;

  /**
   *  Should expenses of this category be shown on the Home Screen
   */
  trackExpenses: boolean;

  /**
   *  Planned money amount that can be spent for this category
   */
  plannedAmount: number;
}

export default ExpenseCategory;