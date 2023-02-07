import { useState } from "react";
import { useSelector } from "react-redux";

import AppState from "src/domain/app-state/app-state";
import ExpenseType from "../../../domain/expense/components/expense-type";
import { Input, Layout, Text } from "@ui-kitten/components";

export function ExpensesSettings() {
  const expenseTypeSettings = useSelector((state: AppState) => state.settings.settings.expensesSettings);

  const [mainExpensesPercent, setMainExpensesPercent] = useState(expenseTypeSettings.find((exp) => exp.expenseType === ExpenseType.Main)?.percent);
  const [secondaryExpensesPercent, setSecondaryExpensesPercent] = useState(expenseTypeSettings.find((exp) => exp.expenseType === ExpenseType.Secondary)?.percent);
  const [postponedExpensesPercent, setPostponedExpensesPercent] = useState(expenseTypeSettings.find((exp) => exp.expenseType === ExpenseType.Postponed)?.percent);

  return (
    <Layout>
      <Input label="Main" placeholder="Enter main expenses percent..."/>
      <Input label="Secondary" placeholder="Enter secondary expenses percent..." />
      <Input label="Postponed" placeholder="Enter percent amount of money to postpone..."/>
    </Layout>
  )
}