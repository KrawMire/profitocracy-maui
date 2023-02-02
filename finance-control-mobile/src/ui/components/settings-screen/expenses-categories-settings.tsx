import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { sharedTextStyle } from "styles/shared/text.style";

export function ExpensesCategoriesSettings() {
  const categories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);

  const isCategoriesExists = categories && categories.length > 0;
  return (
    <Layout>
      <Text style={sharedTextStyle.sectionTitle}>Expenses categories</Text>
      {isCategoriesExists ? categories.map((category) => (
        <Layout key={category.id}>
          <Text>{category.name}</Text>
          <Text>{category.plannedAmount}</Text>
          <Text>Track: {category.trackExpenses ? "Yes" : "No"}</Text>
        </Layout>
      )) : (
        <Text>No expenses categories</Text>
      )}
    </Layout>
  )
}