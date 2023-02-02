import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

import AppState from "src/domain/app-state/app-state";
import ExpenseType from "../../../domain/expense/components/expense-type";
import { sharedTextStyle } from "styles/shared/text.style";

export function ExpensesSettings() {
  const expenseTypeSettings = useSelector((state: AppState) => state.settings.settings.expensesSettings);

  const [mainExpensesPercent, setMainExpensesPercent] = useState(expenseTypeSettings.find((exp) => exp.expenseType === ExpenseType.Main)?.percent);
  const [secondaryExpensesPercent, setSecondaryExpensesPercent] = useState(expenseTypeSettings.find((exp) => exp.expenseType === ExpenseType.Secondary)?.percent);
  const [postponedExpensesPercent, setPostponedExpensesPercent] = useState(expenseTypeSettings.find((exp) => exp.expenseType === ExpenseType.Postponed)?.percent);

  return (
    <View>
      <Text style={sharedTextStyle.sectionTitle}>Expenses settings</Text>
      <Text>Main</Text>
      <TextInput placeholder="Enter main expenses percent..."/>
      <Text>Secondary</Text>
      <TextInput placeholder="Enter secondary expenses percent..." />
      <Text>Postponed</Text>
      <TextInput placeholder="Enter percent amount of money to postpone..."/>
    </View>
  )
}