import { Action } from "state/types";
import {currencyInitialState} from "state/initial-state";
import CurrencyState, {CurrencyRate} from "../../domain/app-state/components/currency-state";
import {CurrencyActionsReturnTypes, CurrencyActionsTypes} from "state/currency/actions";
import Currency from "../../domain/currency/currency";

/**
 * Billing periods actions handler
 * @param state Current state of the billing periods
 * @param action Billing periods action
 */
export function currencyReducer (
  state: CurrencyState = currencyInitialState,
  action: Action<CurrencyActionsReturnTypes>
): CurrencyState {
  switch (action.type) {
    case CurrencyActionsTypes.SetMainCurrency:
      const newBaseCurrency = <Currency>action.payload;
      return {
        ...state,
        baseCurrency: newBaseCurrency,
      }
    case CurrencyActionsTypes.AddAvailableCurrency:
      const newCurrency = <CurrencyRate>action.payload;
      const newAvailableCurrencies = [...state.availableCurrencies];
      newAvailableCurrencies.push(newCurrency);
      return {
        ...state,
        availableCurrencies: newAvailableCurrencies,
      }
    case CurrencyActionsTypes.SetAvailableCurrencies:
      const availableCurrencies = <CurrencyRate[]>action.payload;
      return {
        ...state,
        availableCurrencies: availableCurrencies
      }
    default:
      return state;
  }
}