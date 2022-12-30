import Expense from "objectsTypes/expense";
import { ExpensesActionTypes } from "./actions";
import { ExpensesAction, ExpensesState } from "./types";

const initialState: ExpensesState = [];

export function expensesReducer(
  state: ExpensesState = initialState,
  action: ExpensesAction
): ExpensesState {
  const newState = state.slice();

  switch (action.type) {
    case ExpensesActionTypes.AddExpense:
      return [...newState, <Expense>action.payload];
    case ExpensesActionTypes.SpecifyExpenses:
      return [...newState, ...<Expense[]>action.payload]
    default:
      return newState;
  }
}