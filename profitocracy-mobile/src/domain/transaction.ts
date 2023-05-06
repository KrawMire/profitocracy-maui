import { Category } from "domain/category";
import { Currency } from "domain/currency";
import { SpendType } from "domain/spending";

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  mainCurrencyAmount: number;
  category: Category | null;
  currency: Currency;
  spendType: SpendType;
  isIncome: boolean;
}
