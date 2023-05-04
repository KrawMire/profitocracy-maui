import { Action } from "state/state-types";
import { AnchorDatesActionsPayloadTypes, AnchorDatesActionsTypes } from "state/anchor-dates/actions";
import { AnchorDate } from "domain/anchor-date";
import { initialAnchorDatesState } from "state/initial-state";

export function anchorDatesReducer(
  state: AnchorDate[] = initialAnchorDatesState,
  action: Action<AnchorDatesActionsPayloadTypes>,
): AnchorDate[] {
  switch (action.type) {
    case AnchorDatesActionsTypes.AddAnchorDate: {
      const newDate = <AnchorDate>action.payload;
      return [...state, newDate];
    }

    default:
      return state;
  }
}
