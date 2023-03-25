export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getDaysInCurrentMonth() {
  return getDaysInMonth(new Date().getFullYear(), new Date().getMonth());
}