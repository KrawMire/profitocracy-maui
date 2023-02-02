/**
 * Period of tracking expenses
 */
export type BillingPeriod = {
  /**
   * Identifier of the billing period
   */
  id: string;

  /**
   * Start date of billing period
   */
  dateFrom: Date;

  /**
   * End date of billing period
   */
  dateTo: Date | null;
}

/**
 * Represents state of the billing periods in application
 */
export type BillingPeriodsState = {
  /**
   * Passed billing periods
   */
  periods: BillingPeriod[];
}