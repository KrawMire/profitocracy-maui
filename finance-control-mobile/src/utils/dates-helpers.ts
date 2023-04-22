import moment from "moment";

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getDaysInCurrentMonth() {
  return getDaysInMonth(new Date().getFullYear(), new Date().getMonth());
}

export function getCurrentDay() {
  return new Date(Date.now()).getDate();
}

export function createDateForCurrentMonth(day: number) {
  const today = moment();
  const date = today.date(day);

  return date.toDate();
}
