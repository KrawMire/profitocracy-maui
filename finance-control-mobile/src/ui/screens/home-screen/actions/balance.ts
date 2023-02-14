import Transaction from "src/domain/transaction/transaction";

export function calculateActualBalance(initialBalance: number, transactions: Transaction[]): number {
  if (transactions.length === 0) {
    return initialBalance;
  }

  const totalTransaction = transactions.reduce((prevValue, curValue) => {
    const curAmount = curValue.amount + prevValue.amount;
    const nextTransaction: Transaction = {
      ...prevValue,
      amount: curAmount
    }

    return nextTransaction;
  });

  return initialBalance - totalTransaction.amount;
}