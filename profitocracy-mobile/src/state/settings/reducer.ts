import { Action } from "state/state-types";
import { Settings, ThemeSettings } from "domain/settings";
import { initialSettingsState } from "state/initial-state";
import { SettingsActionsPayloadTypes, SettingsActionsTypes } from "state/settings/actions";
import { Currency } from "domain/currency";

export function settingsReducer(
  state: Settings = initialSettingsState,
  action: Action<SettingsActionsPayloadTypes>,
): Settings {
  switch (action.type) {
    case SettingsActionsTypes.SetIsAppSetUp: {
      const value = <boolean>action.payload;
      return {
        ...state,
        isSetUp: value,
      };
    }

    case SettingsActionsTypes.SetTheme: {
      const theme = <ThemeSettings>action.payload;
      return {
        ...state,
        theme: theme,
      };
    }

    case SettingsActionsTypes.SetAnchorDays: {
      const anchorDays = <number[]>action.payload;
      return {
        ...state,
        anchorDays: anchorDays,
      };
    }

    case SettingsActionsTypes.SetMainCurrency: {
      const currency = <Currency>action.payload;
      return {
        ...state,
        mainCurrency: currency,
      };
    }

    default:
      return state;
  }
}
