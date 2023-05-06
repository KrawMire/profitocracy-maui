import { showError } from "utils/toast/show-error";
import { SpendType } from "domain/spending";

export function getSpendingTypeName(type: SpendType): string {
  switch (type) {
    case SpendType.Main:
      return "Main expenses";
    case SpendType.Secondary:
      return "Secondary expenses";
    case SpendType.Saved:
      return "Postponed";
    default:
      showError("Unknown expense type! Contact support!");
      return "";
  }
}
