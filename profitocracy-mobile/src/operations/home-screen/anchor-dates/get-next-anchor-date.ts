import { createDateForMonth } from "utils/dates/create-date-of-month";

export function getNextAnchorDate(currentAnchorDate: Date, anchorDays: number[]): Date {
  const currentAnchorDay = currentAnchorDate.getDate();
  const currentAnchorMonth = currentAnchorDate.getMonth();

  let nextAnchorDayIndex = 0;
  let isNextMonth = false;

  for (let i = 0; i < anchorDays.length; i++) {
    if (anchorDays[i] === currentAnchorDay) {
      isNextMonth = i === anchorDays.length - 1;
      nextAnchorDayIndex = isNextMonth ? 0 : i + 1;
    }
  }

  const nextAnchorDay = anchorDays[nextAnchorDayIndex];
  const nextAnchorDayMonth = isNextMonth ? currentAnchorMonth + 1 : currentAnchorMonth;

  return createDateForMonth(nextAnchorDay, nextAnchorDayMonth);
}
