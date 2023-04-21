import Currency from "../../currency/currency";

/**
 * Represents state of currencies
 */
interface CurrencyState {
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
export interface CurrencyRate {
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
