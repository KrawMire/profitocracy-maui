import ExpenseType from "domain/expense/components/expense-type";
import {showMessage} from "react-native-flash-message";

export function getExpenseTypeName(type: ExpenseType): string {
  switch (type) {
    case ExpenseType.Main:
      return "Main expenses";
    case ExpenseType.Secondary:
      return "Secondary expenses";
    case ExpenseType.Postponed:
      return "Postponed";
    default:
      showMessage({
        message: "Unknown expense type! Contact support!",
        type: "danger",
      });
      return "";
  }
}