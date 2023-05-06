import { getDaysInMonth } from "utils/dates/get-days-in-month";
import { roundNumber } from "utils/numbers/convert-number";

export function getDailyBalance(balance: number, dateFrom: Date, dateTo: Date) {
  const month = dateFrom.getMonth();
  const daysInMonth = getDaysInMonth(new Date().getFullYear(), month);

  let dailyBalance;

  if (month < dateTo.getMonth()) {
    dailyBalance = balance / (daysInMonth - dateFrom.getDate() + dateTo.getDate());
  } else {
    dailyBalance = balance / (dateTo.getDate() - dateFrom.getDate());
  }

  return roundNumber(dailyBalance);
}
