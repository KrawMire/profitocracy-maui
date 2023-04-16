import Currency from "../../currency/currency";

/**
 * Represents state of currencies
 */
type CurrencyState = {
  /**
   * Main currency used as base
   */
  baseCurrency: Currency;

  /**
   * Currencies which can be used in application with rates from base currency
   */
  availableCurrencies: CurrencyRate[];
}

/**
 * Currency rate
 */
export type CurrencyRate = {
  /**
   * Currency
   */
  currency: Currency;

  /**
   * Rate from base currency
   */
  rate: number;
}

export default CurrencyState;