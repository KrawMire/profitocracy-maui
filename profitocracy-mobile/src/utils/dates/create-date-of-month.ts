import moment from "moment/moment";

export function createDateForCurrentMonth(day: number) {
  const currentMonth = new Date(Date.now()).getMonth();
  return createDateForMonth(day, currentMonth);
}

export function createDateForMonth(day: number, month: number) {
  const today = moment();
  const date = today.date(day).month(month);

  return date.toDate();
}
