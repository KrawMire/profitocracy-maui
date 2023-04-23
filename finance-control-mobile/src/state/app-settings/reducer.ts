import { Action } from "state/types";
import AppSettingsState from "src/domain/app-state/components/app-settings-state";
import { AppSettingsActionsReturnTypes, AppSettingsActionsTypes } from "./actions";
import ExpenseCategory from "src/domain/expense-category/expense-category";
import ExpenseTypeSettings from "src/domain/app-settings/components/expense-type-settings";
import ThemeSettings from "../../domain/app-settings/components/theme-settings";
import { appSettingsInitialState } from "state/initial-state";
import AnchorDaysSettings from "domain/app-settings/components/anchor-days-settings";

/**
 * App settings actions handler
 * @param state Current state of the app settings
 * @param action App settings action
 */
export function appSettingsReducer(
  state: AppSettingsState = appSettingsInitialState,
  action: Action<AppSettingsActionsReturnTypes>,
): AppSettingsState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case AppSettingsActionsTypes.SetTheme: {
      newState.settings.themeSettings = <ThemeSettings>action.payload;
      return newState;
    }

    case AppSettingsActionsTypes.SetAnchorDays: {
      const newAnchorDaysSettings = <AnchorDaysSettings>action.payload;
      return {
        ...state,
        settings: {
          ...state.settings,
          anchorDatesSettings: newAnchorDaysSettings,
        },
      };
    }

    case AppSettingsActionsTypes.AddExpenseCategory: {
      return {
        settings: {
          ...state.settings,
          expenseCategoriesSettings: {
            categories: [...state.settings.expenseCategoriesSettings.categories, <ExpenseCategory>action.payload],
          },
        },
      };
    }

    case AppSettingsActionsTypes.RemoveExpenseCategory: {
      newState.settings.expenseCategoriesSettings.categories =
        newState.settings.expenseCategoriesSettings.categories.filter(
          (category) => category.id !== <string>action.payload,
        );
      return newState;
    }

    case AppSettingsActionsTypes.SetExpenseSettings: {
      newState.settings.expensesSettings = <ExpenseTypeSettings[]>action.payload;
      return newState;
    }

    default:
      return state;
  }
}
