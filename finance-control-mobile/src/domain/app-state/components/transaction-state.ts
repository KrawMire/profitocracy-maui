import Transaction from "src/domain/transaction/transaction";

/**
 * Represents state of the current transactions
 */
type TransactionsState = {
  /**
   * Current transactions
   */
  transactions: Transaction[];
}

export default TransactionsState;