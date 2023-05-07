import { Transaction } from "domain/transaction";
import { SpendType } from "domain/spending";

export function getTotalSaved(transactions: Transaction[]): number {
  let totalSaved = 0;

  transactions.forEach((transaction) => {
    if (transaction.isIncome || transaction.spendType !== SpendType.Saved) {
      return;
    }

    totalSaved += transaction.mainCurrencyAmount;
  });

  return totalSaved;
}
