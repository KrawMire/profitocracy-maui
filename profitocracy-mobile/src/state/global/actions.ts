import { Action } from "state/state-types";

export enum GlobalActionTypes {
  Reset = "RESET_STORE",
}

/**
 * Reset store to initial state
 */
export function resetStore(): Action<null> {
  return {
    type: GlobalActionTypes.Reset,
    payload: null,
  };
}
