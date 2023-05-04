import { Currency } from "domain/currency";

export interface Balance {
  amount: number;
  currency: Currency;
}
