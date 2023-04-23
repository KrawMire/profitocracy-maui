import { Action } from "state/types";


export enum GlobalActionTypes {
  Reset = "RESET_STORE",
  SetReadyState = "SET_APP_READY_STATE"
}

export type GlobalActionsReturnTypes = null | boolean;

/**
 * Reset store to initial state
 */
export function resetStore(): Action<null> {
  return {
    type: GlobalActionTypes.Reset,
    payload: null
  }
}

/**
 * Set is app ready flag
 * @param readyValue Value of current app readiness
 */
export function setAppReady(readyValue: boolean): Action<boolean> {
  return {
    type: GlobalActionTypes.SetReadyState,
    payload: readyValue
  }
}