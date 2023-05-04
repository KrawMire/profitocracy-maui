import { Action } from "state/state-types";
import { CurrencyRate } from "domain/currency-rate";
import { initialCurrencyRatesState } from "state/initial-state";
import { CurrencyRatesActionsPayloadTypes, CurrencyRatesActionsTypes } from "state/currency-rates/actions";

export function currencyRatesReducer(
  state: CurrencyRate[] = initialCurrencyRatesState,
  action: Action<CurrencyRatesActionsPayloadTypes>,
): CurrencyRate[] {
  switch (action.type) {
    case CurrencyRatesActionsTypes.SetCurrencyRates: {
      return <CurrencyRate[]>action.payload;
    }

    default:
      return state;
  }
}
