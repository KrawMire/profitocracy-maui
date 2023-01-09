import { Action } from "appState/types";
import TotalBalanceState from "src/domain/app-state/components/total-balance-state";
import { TotalBalanceActionsReturnTypes, TotalBalanceActionsTypes } from "./actions";

const initialState: TotalBalanceState = {
  amount: 0
}

/**
 * Total balance actions handler
 * @param state Current state of the total balance
 * @param action Total balance action
 */
export function totalBalanceReducer (
  state: TotalBalanceState = initialState,
  action: Action<TotalBalanceActionsReturnTypes>
): TotalBalanceState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TotalBalanceActionsTypes.SetTotalBalance:
      newState.amount = action.payload;
      return newState;

    default:
      throw new Error("Invalid action type was given!");
  }
}