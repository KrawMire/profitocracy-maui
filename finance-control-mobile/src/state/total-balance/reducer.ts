
import TotalBalanceState from "src/domain/app-state/components/total-balance-state";
import { TotalBalanceActionsReturnTypes, TotalBalanceActionsTypes } from "./actions";
import { Action } from "state/types";
import { totalBalanceInitialState } from "state/initial-state";

/**
 * Total balance actions handler
 * @param state Current state of the total balance
 * @param action Total balance action
 */
export function totalBalanceReducer (
  state: TotalBalanceState = totalBalanceInitialState,
  action: Action<TotalBalanceActionsReturnTypes>
): TotalBalanceState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TotalBalanceActionsTypes.SetInitialBalance:
      newState.initialBalance = action.payload;
      return {
        ...state,
        initialBalance: action.payload
      }

    default:
      return state;
  }
}