export enum SpendType {
  Main = "MAIN_SPENDING",
  Secondary = "SECONDARY_SPENDING",
  Saved = "SAVED_SPENDING",
}

export interface Spending {
  plannedAmount: number;
  actualAmount: number;
}
