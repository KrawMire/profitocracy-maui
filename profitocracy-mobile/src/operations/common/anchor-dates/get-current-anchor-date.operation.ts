import { createDateForMonth } from "utils/dates/create-date-of-month";

export function getCurrentAnchorDateOperation(days: number[], currentDay: number): Date {
  if (days.length === 0) {
    throw new Error("Days are empty!");
  }

  let anchorDayMonth = new Date(Date.now()).getMonth();
  let nearestDay: number | null = null;

  for (let i = 0; i < days.length; i++) {
    if (currentDay >= days[i]) {
      nearestDay = days[i];
    }

    if (!nearestDay && i === days.length - 1) {
      anchorDayMonth = anchorDayMonth === 0 ? 11 : anchorDayMonth - 1;
      nearestDay = days[i];
    }
  }

  if (!nearestDay) {
    throw new Error("Cannot get nearest anchor day!");
  }

  return createDateForMonth(nearestDay, anchorDayMonth);
}
