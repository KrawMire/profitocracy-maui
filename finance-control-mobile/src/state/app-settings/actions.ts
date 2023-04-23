import { Action } from "state/types";
import ExpenseTypeSettings from "src/domain/app-settings/components/expense-type-settings";
import ThemeSettings from "src/domain/app-settings/components/theme-settings";
import ExpenseCategory from "src/domain/expense-category/expense-category";
import ExpenseType from "src/domain/expense/components/expense-type";
import AnchorDaysSettings from "domain/app-settings/components/anchor-days-settings";

export enum AppSettingsActionsTypes {
  SetTheme = "SET_THEME",
  SetAnchorDays = "SET_ANCHOR_DAYS",
  AddExpenseCategory = "ADD_EXPENSE_CATEGORY",
  RemoveExpenseCategory = "REMOVE_EXPENSE_CATEGORY",
  SetExpenseSettings = "SET_EXPENSE_SETTINGS",
}

export type AppSettingsActionsReturnTypes =
  | ThemeSettings
  | AnchorDaysSettings
  | ExpenseCategory
  | string
  | ExpenseTypeSettings[];

/**
 * Set app theme
 * @param theme Theme to set
 */
export function setTheme(theme: ThemeSettings): Action<ThemeSettings> {
  return {
    type: AppSettingsActionsTypes.SetTheme,
    payload: theme,
  };
}

/**
 * Set anchor days settings
 * @param days Anchor days
 */
export function setAnchorDaysSettings(days: number[]): Action<AnchorDaysSettings> {
  return {
    type: AppSettingsActionsTypes.SetAnchorDays,
    payload: {
      days: days,
    },
  };
}

/**
 * Add a new expense category
 * @param category New expense category
 */
export function addExpenseCategory(category: ExpenseCategory): Action<ExpenseCategory> {
  return {
    type: AppSettingsActionsTypes.AddExpenseCategory,
    payload: category,
  };
}

/**
 * Remove expense category
 * @param id Identifier of the category
 */
export function removeExpenseCategory(id: string): Action<string> {
  return {
    type: AppSettingsActionsTypes.RemoveExpenseCategory,
    payload: id,
  };
}

/**
 * Set concrete expense settings
 * @param expenseType A type of the expense
 * @param percent A percent value for the concrete type of the expense
 */
export function setExpenseSettings(expenseType: ExpenseType, percent: number): Action<ExpenseTypeSettings> {
  return {
    type: AppSettingsActionsTypes.SetExpenseSettings,
    payload: {
      expenseType,
      percent,
    },
  };
}
