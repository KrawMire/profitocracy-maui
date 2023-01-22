import { Action } from "state/types";
import Transaction from "src/domain/transaction/transaction";

export enum TransactionsActionsTypes {
  AddTransaction = "ADD_TRANSACTION",
  UpdateTransaction = "UPDATE_TRANSACTION",
  RemoveTransaction = "REMOVE_TRANSACTION"
}

export type TransactionsActionsReturnTypes = Transaction | string;

/**
 * Create and add a new transaction
 * @param transaction Transaction to add
 */
export function addTransaction(transaction: Transaction): Action<TransactionsActionsReturnTypes> {
  return {
    type: TransactionsActionsTypes.AddTransaction,
    payload: transaction
  }
}

/**
 * Update existing transaction
 * @param id Identifier of the existing transaction
 * @param transaction Payload of the transaction that will be set
 */
export function updateTransaction(id: string, transaction: Transaction): Action<TransactionsActionsReturnTypes> {
  return {
    type: TransactionsActionsTypes.UpdateTransaction,
    payload: {
      ...transaction,
      id
    }
  }
}

/**
 * Remove existing transaction
 * @param id Identifier of the transactio to remove
 */
export function removeTransaction(id: string): Action<TransactionsActionsReturnTypes> {
  return {
    type: TransactionsActionsTypes.RemoveTransaction,
    payload: id
  }
}