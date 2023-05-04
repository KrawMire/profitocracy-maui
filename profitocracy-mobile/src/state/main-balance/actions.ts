import { Action } from "state/state-types";
import { Balance } from "domain/balance";

export enum MainBalanceActionsTypes {
  SetMainBalance = "SET_MAIN_BALANCE",
}

export type MainBalanceActionsPayloadTypes = Balance;

export function setMainBalance(balance: Balance): Action<Balance> {
  return {
    type: MainBalanceActionsTypes.SetMainBalance,
    payload: balance,
  };
}
