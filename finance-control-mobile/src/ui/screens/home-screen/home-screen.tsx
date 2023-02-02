import { Layout, Text } from "@ui-kitten/components";
import { useSelector } from 'react-redux';
import AppState from 'src/domain/app-state/app-state';
import { homeScreenStyles } from "styles/screens/home.style";
import { sharedTextStyle } from 'styles/shared/text.style';

export function HomeScreen() {
  const initialTotalBalance = useSelector((state: AppState) => state.totalBalance.initialBalance);
  const actualTotalBalance = useSelector((state: AppState) => state.totalBalance.actualBalance);
  const expenses = useSelector((state: AppState) => state.expenses.expenses);

  return (
    <Layout style={homeScreenStyles.wrapper}>
      <Text style={sharedTextStyle.screenTitle}>Home</Text>
      <Text>Initial total balance is: {initialTotalBalance ?? 0}</Text>
      <Text>Actual total balance is: {actualTotalBalance ?? 0}</Text>

    {expenses.map((expense) => (
      <Layout key={expense.expenseType}>
        <Text>{expense.name}:</Text>
        <Layout>
          <Text>{expense.actualAmount}</Text>
          <Text>{expense.plannedAmount}</Text>
        </Layout>
      </Layout>
      ))}
    </Layout>
  )
}