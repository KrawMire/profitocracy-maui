import Transaction from "objectsTypes/transaction/transaction";
import { AddTransactionAction } from "./types";

export enum TransactionActionTypes {
  AddTransaction = "ADD_TRANSACTION"
}

export function addTransaction(transaction: Transaction): AddTransactionAction {
  return {
    type: TransactionActionTypes.AddTransaction,
    transaction: transaction
  }
}