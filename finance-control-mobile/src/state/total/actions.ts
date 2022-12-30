import { SetTotalAction } from "./types";

export enum TotalActionTypes {
  SetTotal = "SET_TOTAL"
}

export function setTotal(total: number): SetTotalAction {
  return {
    type: TotalActionTypes.SetTotal,
    total: total
  }
}