import { TotalActionTypes } from "./actions";
import { TotalAction, TotalState } from "./types";

const initialState: TotalState = 0;

export function totalReducer(
  state: TotalState = initialState,
  action: TotalAction
): TotalState {
  const newState = state;

  switch (action.type) {
    case TotalActionTypes.SetTotal:
      return action.total;
    default:
      return newState;
  }
}