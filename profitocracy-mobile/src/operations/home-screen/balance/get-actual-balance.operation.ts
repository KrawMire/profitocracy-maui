import { Transaction } from "domain/transaction";

export function getActualBalanceOperation(balance: number, transactions: Transaction[]): number {
  if (transactions.length === 0) {
    return balance;
  }

  const totalTransaction = transactions.reduce((prevValue, curValue) => {
    const curAmount = curValue.mainCurrencyAmount + prevValue.mainCurrencyAmount;
    const nextTransaction: Transaction = {
      ...prevValue,
      mainCurrencyAmount: curAmount,
    };

    return nextTransaction;
  });

  let actualBalance = balance - totalTransaction.mainCurrencyAmount;
  actualBalance = Number(actualBalance.toFixed(2));

  return actualBalance;
}
