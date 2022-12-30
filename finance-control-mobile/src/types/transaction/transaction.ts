import { TransactionTypes } from "./transaction-types";

export default interface Transaction {
  sum: number;
  type: TransactionTypes;
  description?: string;
  category?: string;
}
