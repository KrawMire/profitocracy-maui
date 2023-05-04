import { Category } from "domain/category";
import { Currency } from "domain/currency";
import { SpendType } from "domain/spend-type";

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: Category;
  currency: Currency;
  spendType: SpendType;
}
