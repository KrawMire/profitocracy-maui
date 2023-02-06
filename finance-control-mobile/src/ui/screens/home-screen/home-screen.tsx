import { Card, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import AppState from 'src/domain/app-state/app-state';
import { homeScreenStyles } from "styles/screens/home.style";
import { sharedTextStyle } from 'styles/shared/text.style';

export function HomeScreen() {
  const initialTotalBalance = useSelector((state: AppState) => state.totalBalance.initialBalance);
  const actualTotalBalance = useSelector((state: AppState) => state.totalBalance.actualBalance);
  const expenses = useSelector((state: AppState) => state.expenses.expenses);
  const expenseCategories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);

  const renderHeader = (header: string) => (
    <Layout>
      <Text category="h6">{header}</Text>
    </Layout>
  )

  return (
    <ScrollView>
      <Layout style={homeScreenStyles.wrapper}>
        <Text category="h1">Home</Text>

        <Card
          header={renderHeader("Total balance")}
          status="success"
        >
          <Text>Initial total balance is: {initialTotalBalance ?? 0}</Text>
          <Text>Actual total balance is: {actualTotalBalance ?? 0}</Text>
        </Card>

        {expenses.map((expense) => (
          <Card
            key={expense.expenseType}
            header={renderHeader(expense.name)}
            status="info"
          >
            <Text>{expense.actualAmount}</Text>
            <Text>{expense.plannedAmount}</Text>
          </Card>
        ))}
        {expenseCategories.map((category) => (
          <Card
            header={renderHeader(category.name)}
            status="danger"
          >
            <Text>{category.plannedAmount}</Text>
          </Card>
        ))}
      </Layout>
    </ScrollView>
  )
}