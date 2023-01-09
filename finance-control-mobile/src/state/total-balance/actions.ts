import { Action } from "appState/types";

export enum TotalBalanceActionsTypes {
  SetTotalBalance = "SET_TOTAL_BALANCE"
}

export type TotalBalanceActionsReturnTypes = number;

/**
 * Set new value of total balance
 * @param amount New total balance value
 */
export function SetTotalBalance(amount: number): Action<TotalBalanceActionsReturnTypes> {
  return {
    type: TotalBalanceActionsTypes.SetTotalBalance,
    payload: amount
  }
}