import { Action } from "appState/types";
import { BillingPeriod } from "src/domain/app-state/components/billing-periods-state";

export enum BillingPeriodsActionsTypes {
  AddBillingPeriod = "ADD_BILLING_PERIOD"
}

export type BillingPeriodsActionsReturnTypes = BillingPeriod;

/**
 * Add a new billing period to history
 * @param billingPeriod New billing period to add
 */
export function addBillingPeriod(billingPeriod: BillingPeriod): Action<BillingPeriod> {
  return {
    type: BillingPeriodsActionsTypes.AddBillingPeriod,
    payload: billingPeriod
  }
}