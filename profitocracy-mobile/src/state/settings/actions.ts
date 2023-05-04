import { Action } from "state/state-types";
import { ThemeSettings } from "domain/settings";
import { Currency } from "domain/currency";

export enum SettingsActionsTypes {
  SetIsAppSetUp = "SET_IS_APP_SETUP",
  SetAnchorDays = "SET_ANCHOR_DAYS",
  SetTheme = "SET_THEME",
  SetMainCurrency = "SET_MAIN_CURRENCY",
}

export type SettingsActionsPayloadTypes = ThemeSettings | number[] | boolean | Currency;

export function setAnchorDays(days: number[]): Action<number[]> {
  return {
    type: SettingsActionsTypes.SetAnchorDays,
    payload: days,
  };
}

export function setTheme(theme: ThemeSettings): Action<ThemeSettings> {
  return {
    type: SettingsActionsTypes.SetTheme,
    payload: theme,
  };
}

export function setIsAppSetUp(value: boolean): Action<boolean> {
  return {
    type: SettingsActionsTypes.SetIsAppSetUp,
    payload: value,
  };
}

export function setMainCurrency(currency: Currency): Action<Currency> {
  return {
    type: SettingsActionsTypes.SetMainCurrency,
    payload: currency,
  };
}
