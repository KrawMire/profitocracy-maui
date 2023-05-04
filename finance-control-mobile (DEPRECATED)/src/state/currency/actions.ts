import { Action } from "state/types";
import Currency from "../../domain/currency/currency";
import {CurrencyRate} from "../../domain/app-state/components/currency-state";

export enum CurrencyActionsTypes {
  SetMainCurrency = "SET_MAIN_CURRENCY",
  AddAvailableCurrency = "ADD_AVAILABLE_CURRENCY",
  SetAvailableCurrencies = "SET_AVAILABLE_CURRENCIES"
}

export type CurrencyActionsReturnTypes = Currency | CurrencyRate | CurrencyRate[];

/**
 * Set main currency
 * @param currency Currency to set as main
 */
export function setMainCurrency(currency: Currency): Action<Currency> {
  return {
    type: CurrencyActionsTypes.SetMainCurrency,
    payload: currency
  }
}

/**
 * Add new available currency for transactions
 * @param currency Currency to add as available
 * @param rate Rate of the new available currency
 */
export function addAvailableCurrency(currency: Currency, rate: number): Action<CurrencyRate> {
  const currencyRate: CurrencyRate = {
    currency,
    rate,
  };

  return {
    type: CurrencyActionsTypes.AddAvailableCurrency,
    payload: currencyRate,
  }
}

/**
 * Set array of available currencies
 * @param currencies Available currencies to set
 */
export function setAvailableCurrencies(currencies: CurrencyRate[]): Action<CurrencyRate[]> {
  return {
    type: CurrencyActionsTypes.SetAvailableCurrencies,
    payload: currencies
  }
}