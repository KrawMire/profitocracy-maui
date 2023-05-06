import { getCurrentAnchorDateOperation } from "operations/common/anchor-dates/get-current-anchor-date.operation";

describe("Getting current anchor date tests", () => {
  let currentMonthNumber: number;
  let previousMonthNumber: number;

  beforeAll(() => {
    const currentDate = new Date(Date.now());

    currentMonthNumber = currentDate.getMonth();
    previousMonthNumber = currentMonthNumber === 1 ? 11 : currentMonthNumber - 1;
  });

  describe("Test with one anchor date", () => {
    test("Test anchor date in the beginning of month", () => {
      const days = [1];
      const currentDay = 10;

      const anchorDate = getCurrentAnchorDateOperation(days, currentDay);

      expect(anchorDate.getDate()).toBe(1);
      expect(anchorDate.getMonth()).toBe(currentMonthNumber);
    });

    test("Test anchor date in the middle of month", () => {
      const days = [15];
      const currentDay = 10;

      const anchorDate = getCurrentAnchorDateOperation(days, currentDay);

      expect(anchorDate.getDate()).toBe(15);
      expect(anchorDate.getMonth()).toBe(previousMonthNumber);
    });

    test("Test anchor date in the end of month", () => {
      const days = [28];
      const currentDay = 10;

      const anchorDate = getCurrentAnchorDateOperation(days, currentDay);

      expect(anchorDate.getDate()).toBe(28);
      expect(anchorDate.getMonth()).toBe(previousMonthNumber);
    });
  });

  describe("Test with two anchor dates", () => {
    test("Test current day in the beginning of month", () => {
      const days = [10, 25];
      const currentDay = 1;

      const anchorDate = getCurrentAnchorDateOperation(days, currentDay);

      expect(anchorDate.getDate()).toBe(25);
      expect(anchorDate.getMonth()).toBe(previousMonthNumber);
    });

    test("Test current day in the middle of month", () => {
      const days = [10, 25];
      const currentDay = 15;

      const anchorDate = getCurrentAnchorDateOperation(days, currentDay);

      expect(anchorDate.getDate()).toBe(10);
      expect(anchorDate.getMonth()).toBe(currentMonthNumber);
    });

    test("Test current day in the end of month", () => {
      const days = [10, 25];
      const currentDay = 25;

      const anchorDate = getCurrentAnchorDateOperation(days, currentDay);

      expect(anchorDate.getDate()).toBe(25);
      expect(anchorDate.getMonth()).toBe(currentMonthNumber);
    });
  });
});
