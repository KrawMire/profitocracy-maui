import { Settings, ThemeSettings } from "domain/settings";
import { Transaction } from "domain/transaction";
import { Category } from "domain/category";
import { CurrencyRate } from "domain/currency-rate";
import { AnchorDate } from "domain/anchor-date";
import { AppState } from "state/app-state";
import { Balance } from "domain/balance";

export const initialSettingsState: Settings = {
  isSetUp: false,
  theme: ThemeSettings.Light,
  anchorDays: [],
  mainCurrency: {
    symbol: "$",
    code: "USD",
    name: "US Dollar",
  },
};

export const initialSavedBalance: Balance = {
  amount: 0,
  currency: initialSettingsState.mainCurrency,
};

export const initialMainBalance: Balance = {
  amount: 0,
  currency: initialSettingsState.mainCurrency,
};

export const initialTransactionsState: Transaction[] = [];

export const initialCategoriesState: Category[] = [];

export const initialCurrencyRatesState: CurrencyRate[] = [];

export const initialAnchorDatesState: AnchorDate[] = [];

export const initialAppState: AppState = {
  transactions: initialTransactionsState,
  settings: initialSettingsState,
  anchorDates: initialAnchorDatesState,
  categories: initialCategoriesState,
  currencyRates: initialCurrencyRatesState,
  savedBalance: initialSavedBalance,
  mainBalance: initialMainBalance,
};
