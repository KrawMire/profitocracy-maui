import Transaction from "objectsTypes/transaction/transaction"

// Actions

export type AddTransactionAction = {
  type: string,
  transaction: Transaction
}

export type TransactionsAction = AddTransactionAction;

// State

export type TransactionsState = Transaction[];