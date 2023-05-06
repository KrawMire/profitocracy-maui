import { Transaction } from "domain/transaction";
import { SpendType } from "domain/spending";

export interface GroupedTransactionsAmount {
  totalAmount: number;
  mainSpendingTotalAmount: number;
  secondarySpendingTotalAmount: number;
  savedTotalAmount: number;
}

export function groupTransactionsAmount(transactions: Transaction[]): GroupedTransactionsAmount {
  const result: GroupedTransactionsAmount = {
    totalAmount: 0,
    mainSpendingTotalAmount: 0,
    secondarySpendingTotalAmount: 0,
    savedTotalAmount: 0,
  };

  transactions.forEach((transaction) => {
    result.totalAmount = transaction.isIncome
      ? result.totalAmount - transaction.mainCurrencyAmount
      : result.totalAmount + transaction.mainCurrencyAmount;

    if (transaction.isIncome) {
      return;
    }

    switch (transaction.spendType) {
      case SpendType.Main:
        result.mainSpendingTotalAmount += transaction.mainCurrencyAmount;
        break;
      case SpendType.Secondary:
        result.secondarySpendingTotalAmount += transaction.mainCurrencyAmount;
        break;
      case SpendType.Saved:
        result.savedTotalAmount += transaction.mainCurrencyAmount;
        break;
    }
  });

  return result;
}
