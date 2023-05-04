import Transaction from "src/domain/transaction/transaction";

/**
 * Represents state of the current transactions
 */
interface TransactionsState {
  /**
   * Current transactions
   */
  transactions: Transaction[];
}

export default TransactionsState;
