import { Action } from "state/state-types";
import { AnchorDate } from "domain/anchor-date";

export enum AnchorDatesActionsTypes {
  AddAnchorDate = "ADD_ANCHOR_DATE",
}

export type AnchorDatesActionsPayloadTypes = AnchorDate;

export function addAnchorDate(date: AnchorDate): Action<AnchorDate> {
  return {
    type: AnchorDatesActionsTypes.AddAnchorDate,
    payload: date,
  };
}
