import { Action } from "state/types";

export enum TotalBalanceActionsTypes {
  SetInitialBalance = "SET_INITIAL_BALANCE"
}

export type TotalBalanceActionsReturnTypes = number;

/**
 * Set new value of initial balance for billing period
 * @param amount New initial balance value
 */
export function setInitialBalance(amount: number): Action<TotalBalanceActionsReturnTypes> {
  return {
    type: TotalBalanceActionsTypes.SetInitialBalance,
    payload: amount
  }
}