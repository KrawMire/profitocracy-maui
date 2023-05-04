
import TotalBalanceState from "src/domain/app-state/components/total-balance-state";
import { Action } from "state/types";
import { globalInitialState, initialAppState } from "state/initial-state";
import { GlobalActionTypes, GlobalActionsReturnTypes } from "./actions";
import AppState from "src/domain/app-state/app-state";
import GlobalState from "src/domain/app-state/components/global-state";

/**
 * Total balance actions handler
 * @param state Current state of the total balance
 * @param action Total balance action
 */
export function globalAppReducer (
  state: GlobalState = globalInitialState,
  action: Action<GlobalActionsReturnTypes>
): GlobalState {
  switch (action.type) {
    case GlobalActionTypes.SetReadyState:
      return {
        ...state,
        isSetUp: <boolean>action.payload
      }

    default:
      return state;
  }
}