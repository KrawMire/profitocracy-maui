import { Action } from "state/types";
import AnchorDatesState from "domain/app-state/components/anchor-dates-state";
import { anchorDatesInitialState } from "state/initial-state";
import { AnchorDatesActionsReturnTypes, AnchorDatesActionsTypes } from "state/anchor-dates/actions";
import AnchorDate from "domain/anchor-date/anchor-date";

/**
 * Anchor dates actions handler
 * @param state Current state of the anchor dates
 * @param action Anchor dates action
 */
export function anchorDatesReducer(
  state: AnchorDatesState = anchorDatesInitialState,
  action: Action<AnchorDatesActionsReturnTypes>,
): AnchorDatesState {
  switch (action.type) {
    case AnchorDatesActionsTypes.AddAnchorDate: {
      const newDate = <AnchorDate>action.payload;

      return {
        dates: [...state.dates, newDate],
      };
    }

    default:
      return state;
  }
}
