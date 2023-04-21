import { Action } from "state/types";
import AnchorDate from "domain/anchor-date/anchor-date";

export enum AnchorDatesActionsTypes {
  AddAnchorDate = "ADD_ANCHOR_DATE",
}

export type AnchorDatesActionsReturnTypes = AnchorDate;

/**
 * Add a new anchor date
 * @param date New anchor date to add
 */
export function addAnchorDate(date: AnchorDate): Action<AnchorDate> {
  return {
    type: AnchorDatesActionsTypes.AddAnchorDate,
    payload: date,
  };
}
