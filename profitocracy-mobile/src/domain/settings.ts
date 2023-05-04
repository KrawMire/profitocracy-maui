import { Currency } from "domain/currency";

export enum ThemeSettings {
  Light = "LIGHT_THEME",
  Dark = "DARK_THEME",
}

export interface Settings {
  isSetUp: boolean;
  theme: ThemeSettings;
  anchorDays: number[];
  mainCurrency: Currency;
}
