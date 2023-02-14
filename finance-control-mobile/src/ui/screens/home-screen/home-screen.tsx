import { Card, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import AppState from 'src/domain/app-state/app-state';
import ExpenseCategory from "src/domain/expense-category/expense-category";
import { homeScreenStyles } from "styles/screens/home.style";
import { convertArrayToTwoDimensional } from "utils/array-converter";
import { converCategories, getTrackingCategories } from "./actions/expense-categories";
import { calculateActualBalance } from "./actions/balance";
import { calculateExpenseType } from "./actions/expense-type";

export function HomeScreen() {
  const initialTotalBalance = useSelector((state: AppState) => state.totalBalance.initialBalance) ?? 0;
  const expenses = useSelector((state: AppState) => state.expenses.expenses);
  const expenseCategories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);
  const transactions = useSelector((state: AppState) => state.transactions.transactions);
  const startBillingPeriodDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateFrom);
  const endBillingPeriodDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateTo);

  const currentDay = new Date(Date.now()).getDate();
  const trackingCategories = getTrackingCategories(expenseCategories);

  const actualBalance = calculateActualBalance(initialTotalBalance, transactions);
  const parsedCategories = converCategories(trackingCategories);
  const initialDailyAmount = initialTotalBalance / (endBillingPeriodDay - startBillingPeriodDay);
  const actualDailyAmount = actualBalance / (endBillingPeriodDay - currentDay);

  const renderHeader = (header: string) => (
    <Layout>
      <Text category="h6">{header}</Text>
    </Layout>
  )

  return (
    <Layout
      style={homeScreenStyles.wrapper}
      level="4"
    >
      <ScrollView style={homeScreenStyles.scrollWrapper}>
        <Text category="h1">Home</Text>

        <Card
          header={renderHeader("Total balance")}
          status="success"
          style={homeScreenStyles.infoCard}
        >
          <Text>Initial total balance is: {initialTotalBalance ?? 0}</Text>
          <Text>Actual total balance is: {actualBalance ?? 0}</Text>
        </Card>

        <Text category="h4">
          Cash for the day
        </Text>
        <Layout
          style={homeScreenStyles.dailyCashWrapper}
          level="4"
        >
          <Card
            header={renderHeader("Initial")}
            status="success"
            style={homeScreenStyles.dailyCashCard}
          >
            <Text>
              {initialDailyAmount}
            </Text>
          </Card>
          <Card
            header={renderHeader("Actual")}
            status="success"
            style={homeScreenStyles.dailyCashCard}
          >
            <Text>
              {actualDailyAmount}
            </Text>
          </Card>
        </Layout>

        <Text category="h4">
          Expense types
        </Text>
        {expenses.map((expense) => (
          <Card
            key={expense.expenseType}
            header={renderHeader(expense.name)}
            style={homeScreenStyles.infoCard}
            status="info"
          >
            <Text>{calculateExpenseType(expense.expenseType, transactions)}</Text>
            <Text>{expense.plannedAmount}</Text>
          </Card>
        ))}


        <Text category="h4">
          Expense categories
        </Text>
        <Layout
          level="4"
          style={homeScreenStyles.categoriesWrapper}
        >
          {parsedCategories.map((expenseLine) => (
            <Layout
              style={homeScreenStyles.categoriesLineWrapper}
              level="4"
            >
              {expenseLine.map((category) => (
                <Card
                  key={category.id}
                  header={renderHeader(category.name)}
                  style={homeScreenStyles.infoCard}
                  status="danger"
                >
                  <Text>{category.plannedAmount}</Text>
                </Card>
              ))}
            </Layout>
          ))}
        </Layout>
      </ScrollView>
    </Layout>
  )
}