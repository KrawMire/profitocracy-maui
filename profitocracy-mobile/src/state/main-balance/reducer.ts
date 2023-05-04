import { Action } from "state/state-types";
import { initialMainBalance } from "state/initial-state";
import { Balance } from "domain/balance";
import { MainBalanceActionsPayloadTypes, MainBalanceActionsTypes } from "state/main-balance/actions";

export function mainBalanceReducer(
  state: Balance = initialMainBalance,
  action: Action<MainBalanceActionsPayloadTypes>,
): Balance {
  switch (action.type) {
    case MainBalanceActionsTypes.SetMainBalance: {
      return <Balance>action.payload;
    }

    default:
      return state;
  }
}
