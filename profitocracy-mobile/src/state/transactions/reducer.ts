import { Action } from "state/state-types";
import { Transaction } from "domain/transaction";
import { initialTransactionsState } from "state/initial-state";
import { TransactionsActionsPayloadTypes, TransactionsActionsTypes } from "state/transactions/actions";

export function transactionsReducer(
  state: Transaction[] = initialTransactionsState,
  action: Action<TransactionsActionsPayloadTypes>,
): Transaction[] {
  switch (action.type) {
    case TransactionsActionsTypes.AddTransaction: {
      const transaction = <Transaction>action.payload;
      return [transaction, ...state];
    }

    case TransactionsActionsTypes.RemoveTransaction: {
      const id = <string>action.payload;
      return state.filter((transaction) => transaction.id !== id);
    }

    default:
      return state;
  }
}
