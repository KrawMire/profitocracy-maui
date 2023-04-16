/**
 * Represents currency used in application
 */
type Currency = {
  /**
   * Name of the currency
   */
  name: string;

  /**
   * Code of the currency. For example, Dollar is USD
   */
  code: string;

  /**
   * Symbol of the currency. For example, Dollar is $
   */
  symbol: string;
}

export default Currency;