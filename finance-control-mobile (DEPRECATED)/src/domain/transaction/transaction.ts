import ExpenseType from "../expense/components/expense-type";

/**
 * Represents transaction made by user
 */
interface Transaction {
  /**
   * Identifier of the transaction
   */
  id: string;

  /**
   * Amount of money which was spent for transaction
   */
  amount: number;

  /**
   * Amount of money in base user currency
   */
  baseCurrencyAmount: number;

  /**
   * Optional description about transaction
   */
  description: string;

  /**
   * Type of the transaction. Can be main, secondary or postponed
   */
  type: ExpenseType;

  /**
   * Identifier of the expense category of transaction
   */
  category: string;

  /**
   * Transaction currency code
   */
  currencyCode: string;

  /**
   * Date of the creating of transaction
   */
  date: string;
}

export default Transaction;
