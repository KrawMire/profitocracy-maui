import Expense from "objectsTypes/expense";
import { AddExpenseAction, SpecifyExpensesAction } from "./types";

export enum ExpensesActionTypes {
  AddExpense = "ADD_EXPENSE",
  SpecifyExpenses = "SPECIFY_EXPENSES"
}

export function addExpense(expense: Expense): AddExpenseAction {
  return {
    type: ExpensesActionTypes.AddExpense,
    payload: expense
  }
}

export function specifyExpenses(expenses: Expense[]): SpecifyExpensesAction {
  return {
    type: ExpensesActionTypes.SpecifyExpenses,
    payload: expenses
  }
}