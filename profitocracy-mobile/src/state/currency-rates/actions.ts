import { Action } from "state/state-types";
import { CurrencyRate } from "domain/currency-rate";

export enum CurrencyRatesActionsTypes {
  SetCurrencyRates = "SET_CURRENCY_RATES",
}

export type CurrencyRatesActionsPayloadTypes = CurrencyRate[];

export function setCurrencyRates(rates: CurrencyRate[]): Action<CurrencyRate[]> {
  return {
    type: CurrencyRatesActionsTypes.SetCurrencyRates,
    payload: rates,
  };
}
