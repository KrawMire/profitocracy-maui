import { Action } from "state/types";
import TransactionsState from "src/domain/app-state/components/transaction-state";
import Transaction from "src/domain/transaction/transaction";
import { TransactionsActionsReturnTypes, TransactionsActionsTypes } from "./actions";
import { transactionsInitialState } from "state/initial-state";

/**
 * Transactions actions handler
 * @param state Current state of transactions
 * @param action Transactions action
 */
export function transactionsReducer (
  state: TransactionsState = transactionsInitialState,
  action: Action<TransactionsActionsReturnTypes>
): TransactionsState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TransactionsActionsTypes.AddTransaction:
      return {
        ...state,
        transactions: [
          <Transaction>action.payload,
          ...state.transactions,
        ]
      };

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