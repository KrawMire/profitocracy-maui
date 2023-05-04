import { Action } from "state/state-types";
import { Category } from "domain/category";
import { initialCategoriesState } from "state/initial-state";
import { CategoriesActionsPayloadTypes, CategoriesActionsTypes } from "state/categories/actions";

export function categoriesReducer(
  state: Category[] = initialCategoriesState,
  action: Action<CategoriesActionsPayloadTypes>,
): Category[] {
  switch (action.type) {
    case CategoriesActionsTypes.AddNewCategory: {
      const newCategory = <Category>action.payload;
      return [...state, newCategory];
    }

    case CategoriesActionsTypes.RemoveCategory: {
      const categoryName = <string>action.payload;
      return state.filter((category) => category.name !== categoryName);
    }

    default:
      return state;
  }
}
