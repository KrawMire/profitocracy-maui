import { Action } from "state/types";
import Expense from "src/domain/expense/expense";

export enum ExpensesActionsTypes {
  UpdateExpense = "UPDATE_EXPENSE"
}

export type ExpensesActionsReturnTypes = Expense;

/**
 * Update existing expense
 * @param id Identifier of the expense to update
 * @param expense Payload of the expense to set
 */
export function updateExpense(expense: Expense): Action<Expense> {
  return {
    type: ExpensesActionsTypes.UpdateExpense,
    payload: expense
  }
}