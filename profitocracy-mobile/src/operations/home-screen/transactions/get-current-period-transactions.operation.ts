import { Transaction } from "domain/transaction";

export function getCurrentPeriodTransactionsOperation(transactions: Transaction[], dateFrom: Date): Transaction[] {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate > dateFrom;
  });
}
