import { Action } from "state/types";

export enum TotalBalanceActionsTypes {
  SetActualBalance = "SET_ACTUAL_BALANCE",
  SetInitialBalance = "SET_INITIAL_BALANCE"
}

export type TotalBalanceActionsReturnTypes = number;

/**
 * Set new value of actual balance
 * @param amount New actual balance value
 */
export function SetCurrentBalance(amount: number): Action<TotalBalanceActionsReturnTypes> {
  return {
    type: TotalBalanceActionsTypes.SetActualBalance,
    payload: amount
  }
}

/**
 * Set new value of initial balance for billing period
 * @param amount New initial balance value
 */
export function SetInitialBalance(amount: number): Action<TotalBalanceActionsReturnTypes> {
  return {
    type: TotalBalanceActionsTypes.SetInitialBalance,
    payload: amount
  }
}