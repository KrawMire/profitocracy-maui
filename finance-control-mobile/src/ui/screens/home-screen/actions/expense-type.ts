import ExpenseType from "src/domain/expense/components/expense-type";
import Transaction from "src/domain/transaction/transaction";

export function calculateExpenseType(type: ExpenseType, transactions: Transaction[]) {
  const transactionsByType = transactions.filter((transaction) => transaction.type === type);

  if (transactionsByType.length === 0) {
    return 0;
  }

  const transactionByTypeAmount = transactionsByType.reduce((prevTransaction, currentTransaction) => {
    const currentAmount = prevTransaction.amount + currentTransaction.amount;
    const nextTransaction: Transaction = {
      ...prevTransaction,
      amount: currentAmount
    };

    return nextTransaction;
  });

  return transactionByTypeAmount.amount;
}