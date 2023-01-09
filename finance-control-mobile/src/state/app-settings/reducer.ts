import { Action } from "appState/types";
import AppSettingsState from "src/domain/app-state/components/app-settings-state";
import { AppSettingsActionsReturnTypes, AppSettingsActionsTypes } from "./actions";
import BillingPeriodSettings from "src/domain/app-settings/components/biiling-period-settings";
import ExpenseCategory from "src/domain/expense-category/expense-category";
import ExpenseTypeSettings from "src/domain/app-settings/components/expense-type-settings";
import ThemeSettings from "../../domain/app-settings/components/theme-settings";

const initialState: AppSettingsState = {
  settings: {
    billingPeriodSettings: {
      dateFrom: new Date(Date.now()),
      dateTo: new Date(Date.now())
    },
    expensesSettings: [],
    themeSettings: ThemeSettings.Light,
    expenseCategoriesSettings: {
      categories: []
    }
  }
}

/**
 * App settings actions handler
 * @param state Current state of the app settings
 * @param action App settings action
 */
export async function appSettingsReducer(
  state: AppSettingsState = initialState,
  action: Action<AppSettingsActionsReturnTypes>
): Promise<AppSettingsState> {
  const newState = Object.assign({}, state);

  switch (action.type) {
    // Set theme
    case AppSettingsActionsTypes.SetTheme:
      newState.settings.themeSettings = <ThemeSettings>action.payload;
      return newState;

    // Set billing period
    case AppSettingsActionsTypes.SetBillingPeriod:
      newState.settings.billingPeriodSettings = <BillingPeriodSettings>action.payload;
      return newState;

    // Add expense category
    case AppSettingsActionsTypes.AddExpenseCategory:
      newState.settings.expenseCategoriesSettings.categories
        .push(<ExpenseCategory>action.payload);
      return newState;

    // Remove expense category
    case AppSettingsActionsTypes.RemoveExpenseCategory:
      const newCategories = newState.settings.expenseCategoriesSettings.categories
        .filter(category => category.id !== <string>action.payload);
      newState.settings.expenseCategoriesSettings.categories = newCategories;
      return newState;

    // Set expense settings
    case AppSettingsActionsTypes.SetExpenseSettings:
      newState.settings.expensesSettings = <ExpenseTypeSettings[]>action.payload;
      return newState;

    // No such action found
    default:
      return state;
  }
}
