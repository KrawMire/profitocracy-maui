import { Action } from "appState/types";
import ExpensesState from "src/domain/app-state/components/expenses-state";
import Expense from "src/domain/expense/expense";
import { ExpensesActionsReturnTypes, ExpensesActionsTypes } from "./actions";

const initialState: ExpensesState = {
  expenses: []
}

/**
 * Expenses actions handler
 * @param state Current state of the expenses
 * @param action Expenses action
 */
export function expensesReducer (
  state: ExpensesState = initialState,
  action: Action<ExpensesActionsReturnTypes>
): ExpensesState {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ExpensesActionsTypes.UpdateExpense:
      const changedExpense = <Expense>action.payload;
      newState.expenses = state.expenses.map(expense =>
        expense.id === changedExpense.id ? changedExpense : expense);

      return newState;

    default:
      throw new Error("Invalid action type was given!");
  }
}