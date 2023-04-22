import Transaction from "src/domain/transaction/transaction";
import { getCurrentDay, getDaysInCurrentMonth } from "utils/dates-helpers";
import AnchorDate from "domain/anchor-date/anchor-date";

export function getCurrentAnchorDate(
  anchorDays: number[],
  anchorDates: AnchorDate[],
): { nearestAnchorDay: number; anchorDate: AnchorDate | null } {
  const currentDay = getCurrentDay();
  let nearestAnchorDay: number = anchorDays[0];

  for (let i = 0; i < anchorDays.length; i++) {
    if (currentDay >= anchorDays[i]) {
      const nextAnchorDay = anchorDays[i + 1] ?? anchorDays[0];

      if (nextAnchorDay > currentDay) {
        continue;
      }

      nearestAnchorDay = anchorDays[i];
    }
  }

  const anchorDate = anchorDates.find((date) => {
    const parsedDate = new Date(date.date);

    if (!date || !date.date) {
      return false;
    }

    const anchorDayOfMonth = parsedDate.getDate();

    return anchorDayOfMonth === nearestAnchorDay;
  });

  return {
    anchorDate: anchorDate ?? null,
    nearestAnchorDay,
  };
}

export function calculateActualBalance(initialBalance: number, transactions: Transaction[], dateFrom: Date): number {
  if (transactions.length === 0) {
    return initialBalance;
  }

  const transactionsAfterDate = transactions.filter((transaction) => {
    const transactionDate = transaction.date.getTime();
    const anchorDate = dateFrom.getTime();

    return transactionDate > anchorDate;
  });

  const totalTransaction = transactionsAfterDate.reduce((prevValue, curValue) => {
    const curAmount = curValue.baseCurrencyAmount + prevValue.baseCurrencyAmount;
    const nextTransaction: Transaction = {
      ...prevValue,
      baseCurrencyAmount: curAmount,
    };

    return nextTransaction;
  });

  let actualBalance = initialBalance - totalTransaction.baseCurrencyAmount;
  actualBalance = Number(actualBalance.toFixed(2));

  return actualBalance;
}

export function calculateDailyCash(amount: number, startDay: number, days: number[]): number {
  let endDay = 0;
  let dailyCash: number = amount;

  if (!days || days.length === 0) {
    return Number((amount / 30).toFixed(2));
  }

  for (let i = 0; i < days.length; i++) {
    if (startDay >= days[i]) {
      endDay = days[i + 1] ?? days[0];
    }
  }

  if (startDay < endDay) {
    dailyCash = amount / (endDay - startDay);
  } else {
    const daysInMonth = getDaysInCurrentMonth();
    dailyCash = amount / (daysInMonth - startDay + endDay);
  }

  return Number(dailyCash.toFixed(2));
}
