import { Action } from "state/types";


export enum StoreActionTypes {
  Reset = "RESET_STORE"
}

export type StoreActionsReturnTypes = null;

export function resetStore(): Action<null> {
  return {
    type: StoreActionTypes.Reset,
    payload: null
  }
}