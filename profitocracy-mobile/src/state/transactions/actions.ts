import { Action } from "state/state-types";
import { Transaction } from "domain/transaction";

export enum TransactionsActionsTypes {
  AddTransaction = "ADD_TRANSACTION",
  RemoveTransaction = "REMOVE_TRANSACTION",
}

export type TransactionsActionsPayloadTypes = Transaction | string;

export function addTransaction(transaction: Transaction): Action<Transaction> {
  return {
    type: TransactionsActionsTypes.AddTransaction,
    payload: transaction,
  };
}

export function removeTransaction(id: string): Action<string> {
  return {
    type: TransactionsActionsTypes.RemoveTransaction,
    payload: id,
  };
}
