import { Action } from "state/state-types";
import { initialSavedBalance } from "state/initial-state";
import { Balance } from "domain/balance";
import { SavedBalanceActionsPayloadTypes, SavedBalanceActionsTypes } from "state/saved-balance/actions";

export function savedBalanceReducer(
  state: Balance = initialSavedBalance,
  action: Action<SavedBalanceActionsPayloadTypes>,
): Balance {
  switch (action.type) {
    case SavedBalanceActionsTypes.SetSavedBalance: {
      return <Balance>action.payload;
    }

    default:
      return state;
  }
}
