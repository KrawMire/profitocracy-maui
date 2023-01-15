import { Action } from "state/types";
import { BillingPeriodsState } from "src/domain/app-state/components/billing-periods-state";
import { BillingPeriodsActionsReturnTypes, BillingPeriodsActionsTypes } from "./actions";
import { billingPeriodsInitialState } from "state/initial-state";

/**
 * Billing periods actions handler
 * @param state Current state of the billing periods
 * @param action Billing periods action
 */
export function billingPeriodsReducer (
  state: BillingPeriodsState = billingPeriodsInitialState,
  action: Action<BillingPeriodsActionsReturnTypes>
): BillingPeriodsState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case BillingPeriodsActionsTypes.AddBillingPeriod:
      newState.periods.unshift(action.payload);
      return newState;

    default:
      return state;
  }
}