import { Action } from "appState/types";
import TransactionsState from "src/domain/app-state/components/transaction-state";
import Transaction from "src/domain/transaction/transaction";
import { TransactionsActionsReturnTypes, TransactionsActionsTypes } from "./actions";

const initialState: TransactionsState = {
  transactions: []
}

/**
 * Transactions actions handler
 * @param state Current state of transactions
 * @param action Transactions action
 */
export function transactionsReducer (
  state: TransactionsState = initialState,
  action: Action<TransactionsActionsReturnTypes>
): TransactionsState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TransactionsActionsTypes.AddTransaction:
      newState.transactions.unshift(<Transaction>action.payload);
      return newState;

    case TransactionsActionsTypes.RemoveTransaction:
      newState.transactions = state.transactions
        .filter(transaction => transaction.id !== <string>action.payload);
      return newState;

    case TransactionsActionsTypes.UpdateTransaction:
      const changedTransaction = <Transaction>action.payload;
      newState.transactions = state.transactions.map(transaction =>
        transaction.id === changedTransaction.id ? changedTransaction : transaction);
      return newState;

    default:
      return state;
  }
}