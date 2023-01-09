import { Action } from "appState/types";
import { BillingPeriodsState } from "src/domain/app-state/components/billing-periods-state";
import { BillingPeriodsActionsReturnTypes, BillingPeriodsActionsTypes } from "./actions";

const initialState: BillingPeriodsState = {
  periods: []
}

/**
 * Billing periods actions handler
 * @param state Current state of the billing periods
 * @param action Billing periods action
 */
export function billingPeriodsReducer (
  state: BillingPeriodsState = initialState,
  action: Action<BillingPeriodsActionsReturnTypes>
): BillingPeriodsState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case BillingPeriodsActionsTypes.AddBillingPeriod:
      newState.periods.unshift(action.payload);
      return newState;

    default:
      throw new Error("Invalid action type was given!");
  }
}