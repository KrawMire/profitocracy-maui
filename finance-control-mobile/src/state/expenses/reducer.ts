import { Action } from "state/types";
import ExpensesState from "src/domain/app-state/components/expenses-state";
import Expense from "src/domain/expense/expense";
import { ExpensesActionsReturnTypes, ExpensesActionsTypes } from "./actions";
import { expensesInitialState } from "state/initial-state";
/**
 * Expenses actions handler
 * @param state Current state of the expenses
 * @param action Expenses action
 */
export function expensesReducer (
  state: ExpensesState = expensesInitialState,
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
      return state;
  }
}