import { Action } from "state/state-types";
import { Category } from "domain/category";

export enum CategoriesActionsTypes {
  AddNewCategory = "ADD_NEW_CATEGORY",
  RemoveCategory = "REMOVE_CATEGORY",
}

export type CategoriesActionsPayloadTypes = Category | string;

export function addNewCategory(category: Category): Action<Category> {
  return {
    type: CategoriesActionsTypes.AddNewCategory,
    payload: category,
  };
}

export function removeCategory(name: string): Action<string> {
  return {
    type: CategoriesActionsTypes.RemoveCategory,
    payload: name,
  };
}
