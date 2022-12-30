import Expense from "objectsTypes/expense";

// Add expenses

export type AddExpenseAction = {
  type: string,
  payload: Expense
}

export type SpecifyExpensesAction = {
  type: string,
  payload: Expense[]
}

export type ExpensesAction = AddExpenseAction | SpecifyExpensesAction;

// State

export type ExpensesState = Expense[];