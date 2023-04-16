import { Card, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import AppState from 'src/domain/app-state/app-state';
import { homeScreenStyles } from "styles/screens/home.style";
import { convertCategories, getTrackingCategories } from "./actions/expense-categories";
import { calculateActualBalance, calculateDailyCash } from "./actions/balance";
import { calculateExpenseType } from "./actions/expense-type";

export function HomeScreen() {
  const initialTotalBalance = useSelector((state: AppState) => state.totalBalance.initialBalance) ?? 0;
  const transactions = useSelector((state: AppState) => state.transactions.transactions);

  const expenses = useSelector((state: AppState) => state.expenses.expenses);
  const expenseCategories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);

  const startBillingPeriodDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateFrom);
  const endBillingPeriodDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateTo);

  const baseCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const availableCurrencies = useSelector((state: AppState) => state.currencies.availableCurrencies);

  const trackingCategories = getTrackingCategories(expenseCategories);
  const actualBalance = calculateActualBalance(initialTotalBalance, transactions);
  const parsedCategories = convertCategories(trackingCategories);

  const initialDailyAmount = initialTotalBalance / (endBillingPeriodDay - startBillingPeriodDay);
  const actualDailyAmount = calculateDailyCash(actualBalance, startBillingPeriodDay, endBillingPeriodDay);

  const renderHeader = (header: string) => (
    <Layout>
      <Text category="h6">{header}</Text>
    </Layout>
  );

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
          style={homeScreenStyles.balanceCard}
        >
          <Text>Initial balance: {initialTotalBalance ?? 0}{baseCurrency.symbol}</Text>
          <Text>Actual balance: {actualBalance ?? 0}{baseCurrency.symbol}</Text>
        </Card>

        <Text category="h4">
          Cash for the day
        </Text>
        <Layout
          style={homeScreenStyles.dailyCashWrapper}
          level="4"
        >
          <Card
            header={renderHeader("From initial")}
            status="success"
            style={homeScreenStyles.dailyCashCard}
          >
            <Text>
              {initialDailyAmount}{baseCurrency.symbol}
            </Text>
          </Card>
          <Card
            header={renderHeader("From actual")}
            status="success"
            style={homeScreenStyles.dailyCashCard}
          >
            <Text>
              {actualDailyAmount}{baseCurrency.symbol}
            </Text>
          </Card>
        </Layout>

        <Text category="h4">
          Expense types
        </Text>
        <ScrollView horizontal>
          {expenses.map((expense) => (
            <Card
              key={expense.expenseType}
              header={renderHeader(expense.name)}
              style={homeScreenStyles.infoCard}
              status="info"
            >
              <Text>{calculateExpenseType(expense.expenseType, transactions)}{baseCurrency.symbol}</Text>
              <Text>{expense.plannedAmount}{baseCurrency.symbol}</Text>
            </Card>
          ))}
        </ScrollView>


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
                  style={homeScreenStyles.categoryCard}
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