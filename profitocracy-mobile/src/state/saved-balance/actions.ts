import { Action } from "state/state-types";
import { Balance } from "domain/balance";

export enum SavedBalanceActionsTypes {
  SetSavedBalance = "SET_SAVED_BALANCE",
}

export type SavedBalanceActionsPayloadTypes = Balance;

export function setSavedBalance(balance: Balance): Action<Balance> {
  return {
    type: SavedBalanceActionsTypes.SetSavedBalance,
    payload: balance,
  };
}
