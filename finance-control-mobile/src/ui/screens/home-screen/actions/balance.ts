import Transaction from "src/domain/transaction/transaction";
import { getDaysInCurrentMonth } from "utils/dates-helpers";

export function calculateActualBalance(initialBalance: number, transactions: Transaction[]): number {
  if (transactions.length === 0) {
    return initialBalance;
  }

  const totalTransaction = transactions.reduce((prevValue, curValue) => {
    const curAmount = curValue.baseCurrencyAmount + prevValue.baseCurrencyAmount;
    const nextTransaction: Transaction = {
      ...prevValue,
      baseCurrencyAmount: curAmount
    }

    return nextTransaction;
  });

  return initialBalance - totalTransaction.baseCurrencyAmount;
}

export function calculateDailyCash(amount: number, startDay: number, endDay: number): number {
  const currentDay = new Date(Date.now()).getDate();

  let dailyCash: number;

  if (currentDay === startDay || currentDay === endDay) {
    // There will be function to reinitialize balance and save current billing period
    dailyCash = 0;
  } else if (currentDay > endDay) {
    const daysInMonth = getDaysInCurrentMonth();
    dailyCash = amount / (startDay + daysInMonth - currentDay);

  } else if (currentDay > startDay) {
    dailyCash = amount / (endDay - currentDay);

  } else {
    dailyCash = amount / (startDay - currentDay);
  }

  return dailyCash;
}