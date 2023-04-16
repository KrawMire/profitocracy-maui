import ExpenseCategory from "src/domain/expense-category/expense-category";
import { convertArrayToTwoDimensional } from "utils/array-converter";

export function convertCategories(categories: ExpenseCategory[]) {
  let parsedCategories: ExpenseCategory[][] = [];

  if (categories.length > 0) {
    parsedCategories = convertArrayToTwoDimensional<ExpenseCategory>(categories);
  }

  return parsedCategories;
}

export function getTrackingCategories(categories: ExpenseCategory[]) {
  return categories.filter((category) => category.trackExpenses);
}