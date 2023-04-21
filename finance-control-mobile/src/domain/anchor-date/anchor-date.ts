/**
 * Anchor date is used to calculate
 * money per day and expenses by date
 */
interface AnchorDate {
  /**
   * Initial balance for the date
   */
  balance: number;

  /**
   * Creation date of balance state
   */
  date: Date;
}

export default AnchorDate;
