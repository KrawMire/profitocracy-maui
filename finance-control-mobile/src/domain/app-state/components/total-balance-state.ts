/**
 * Represents current state of the current total balance
 */
type TotalBalanceState = {
  /**
   * Initial balance for billing period
   */
  initialBalance: number;

  /**
   * The amount of the current total balance
   */
  actualBalance: number;
}

export default TotalBalanceState;