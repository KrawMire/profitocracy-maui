/**
 * Type of the expenses. Could be main, secondary or postponed
 */
enum ExpenseType {
  /**
   * Main expenses. For example food, rent etc
   */
  Main = "MAIN_EXPENSES",

  /**
   * Secondary expenses. For example entertainment
   */
  Secondary = "SECONDARY_EXPENSES",

  /**
   * Postponed money. For example on deposit
   */
  Postponed = "POSTPONED_EXPENSES",
}

export default ExpenseType;
