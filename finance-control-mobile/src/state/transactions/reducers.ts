import { TransactionActionTypes } from "./actions";
import { TransactionsAction, TransactionsState } from "./types";

const initialState: TransactionsState = [];

export function transactionsReducer(
  state: TransactionsState = initialState,
  action: TransactionsAction
): TransactionsState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TransactionActionTypes.AddTransaction:
      return [action.transaction, ...state]
    default:
      return newState;
  }
}