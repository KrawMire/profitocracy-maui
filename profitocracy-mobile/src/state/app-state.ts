import { Transaction } from "domain/transaction";
import { Category } from "domain/category";
import { CurrencyRate } from "domain/currency-rate";
import { Settings } from "domain/settings";
import { AnchorDate } from "domain/anchor-date";
import { Balance } from "domain/balance";

export interface AppState {
  settings: Settings;
  transactions: Transaction[];
  categories: Category[];
  currencyRates: CurrencyRate[];
  anchorDates: AnchorDate[];
  mainBalance: Balance;
  savedBalance: Balance;
}
