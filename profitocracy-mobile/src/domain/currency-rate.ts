import { Currency } from "domain/currency";

export interface CurrencyRate {
  currency: Currency;
  rate: number;
}
