import { Action } from "appState/types";
import BillingPeriodSettings from "src/domain/app-settings/components/biiling-period-settings";
import ExpenseTypeSettings from "src/domain/app-settings/components/expense-type-settings";
import ThemeSettings from "src/domain/app-settings/components/theme-settings";
import ExpenseCategory from "src/domain/expense-category/expense-category";
import ExpenseType from "src/domain/expense/components/expense-type";

export enum AppSettingsActionsTypes {
  SetTheme = "SET_THEME",
  SetBillingPeriod = "SET_BILLING_PERIOD",
  AddExpenseCategory = "ADD_EXPENSE_CATEGORY",
  RemoveExpenseCategory = "REMOVE_EXPENSE_CATEGORY",
  SetExpenseSettings = "SET_EXPENSE_SETTINGS"
}

export type AppSettingsActionsReturnTypes =
  ThemeSettings | BillingPeriodSettings | ExpenseCategory | string | ExpenseTypeSettings[];

/**
 * Set app theme
 * @param theme Theme to set
 */
export function setTheme(theme: ThemeSettings): Action<ThemeSettings> {
  return {
    type: AppSettingsActionsTypes.SetTheme,
    payload: theme
  }
}

/**
 * Set billing period of the application
 * @param dateFrom Start date of billing period
 * @param dateTo End date of billing period
 */
export function setBillingPeriod(dateFrom: Date, dateTo: Date): Action<BillingPeriodSettings> {
  return {
    type: AppSettingsActionsTypes.SetBillingPeriod,
    payload: {
      dateFrom,
      dateTo
    }
  }
}

/**
 * Add a new expense category
 * @param category New expense category
 */
export function addExpenseCategory(category: ExpenseCategory): Action<ExpenseCategory> {
  return {
    type: AppSettingsActionsTypes.AddExpenseCategory,
    payload: category
  }
}

/**
 * Remove expense category
 * @param id Identifier of the category
 */
export function removeExpenseCategory(id: string): Action<string> {
  return {
    type: AppSettingsActionsTypes.RemoveExpenseCategory,
    payload: id
  }
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
      percent
    }
  }
}