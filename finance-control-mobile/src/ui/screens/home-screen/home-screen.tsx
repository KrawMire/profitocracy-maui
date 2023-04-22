import { Card, Layout, Text } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { homeScreenStyles } from "styles/screens/home.style";
import { convertCategories, getTrackingCategories } from "./actions/expense-categories";
import { calculateActualBalance, calculateDailyCash, getCurrentAnchorDate } from "./actions/balance";
import { calculateExpenseType } from "./actions/expense-type";
import { addAnchorDate } from "state/anchor-dates/actions";
import AnchorDate from "domain/anchor-date/anchor-date";
import { createDateForCurrentMonth, getCurrentDay } from "utils/dates-helpers";
import { useMemo } from "react";

export function HomeScreen() {
  const dispatch = useDispatch();

  const initialBalance = useSelector((state: AppState) => state.totalBalance.initialBalance);
  const transactions = useSelector((state: AppState) => state.transactions.transactions);

  const baseCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const anchorDays = useSelector((state: AppState) => state.settings.settings.anchorDatesSettings.days);
  const anchorDates = useSelector((state: AppState) => state.anchorDates.dates);

  const expenses = useSelector((state: AppState) => state.expenses.expenses);
  const expenseCategories = useSelector(
    (state: AppState) => state.settings.settings.expenseCategoriesSettings.categories,
  );

  const hasAnchorDays = anchorDays.length > 0;
  let initialDisplayBalance = initialBalance;

  if (hasAnchorDays) {
    const { nearestAnchorDay, anchorDate } = getCurrentAnchorDate(anchorDays, anchorDates);

    if (!anchorDate) {
      const newDate = createDateForCurrentMonth(nearestAnchorDay);

      const newAnchorDate: AnchorDate = {
        date: newDate.toString(),
        balance: initialDisplayBalance,
      };

      dispatch(addAnchorDate(newAnchorDate));
    } else {
      initialDisplayBalance = anchorDate.balance;
    }
  }

  const trackingCategories = getTrackingCategories(expenseCategories);
  const parsedCategories = convertCategories(trackingCategories);
  const currentAnchorDate = anchorDates[anchorDates.length - 1] ?? null;
  const parsedCurrentAnchorDate = currentAnchorDate ? new Date(currentAnchorDate.date) : null;

  const actualBalance = useMemo(() => {
    if (!parsedCurrentAnchorDate) {
      return 0;
    }

    return calculateActualBalance(initialDisplayBalance, transactions, parsedCurrentAnchorDate);
  }, [transactions, parsedCurrentAnchorDate]);

  const initialDailyAmount = useMemo(() => {
    if (!parsedCurrentAnchorDate) {
      return 0;
    }

    return calculateDailyCash(initialDisplayBalance, parsedCurrentAnchorDate.getDate(), anchorDays);
  }, [parsedCurrentAnchorDate]);
  const actualDailyAmount = calculateDailyCash(actualBalance, getCurrentDay(), anchorDays);

  const renderHeader = (header: string) => (
    <Layout>
      <Text category="h6">{header}</Text>
    </Layout>
  );

  return (
    <Layout style={homeScreenStyles.wrapper} level="4">
      <ScrollView style={homeScreenStyles.scrollWrapper}>
        <Text category="h1">Home</Text>

        <Card header={renderHeader("Total balance")} status="success" style={homeScreenStyles.balanceCard}>
          <Text>
            Initial balance: {initialBalance ?? 0}
            {baseCurrency.symbol}
          </Text>
          <Text>
            Actual balance: {actualBalance ?? 0}
            {baseCurrency.symbol}
          </Text>
        </Card>

        {hasAnchorDays && (
          <View>
            <Text category="h4" style={homeScreenStyles.sectionHeader}>
              Cash for the day
            </Text>
            <Layout style={homeScreenStyles.dailyCashWrapper} level="4">
              <Card header={renderHeader("From initial")} status="success" style={homeScreenStyles.dailyCashCard}>
                <Text>
                  {initialDailyAmount}
                  {baseCurrency.symbol}
                </Text>
              </Card>
              <Card header={renderHeader("From actual")} status="success" style={homeScreenStyles.dailyCashCard}>
                <Text>
                  {actualDailyAmount}
                  {baseCurrency.symbol}
                </Text>
              </Card>
            </Layout>
          </View>
        )}

        <Text category="h4" style={homeScreenStyles.sectionHeader}>
          Expense types
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {expenses.map((expense) => (
            <Card
              key={expense.expenseType}
              header={renderHeader(expense.name)}
              style={homeScreenStyles.infoCard}
              status="info"
            >
              <Text>
                {calculateExpenseType(expense.expenseType, transactions)}
                {baseCurrency.symbol}
              </Text>
              <Text>
                {expense.plannedAmount}
                {baseCurrency.symbol}
              </Text>
            </Card>
          ))}
        </ScrollView>

        <Text category="h4" style={homeScreenStyles.sectionHeader}>
          Expense categories
        </Text>
        <Layout level="4" style={homeScreenStyles.categoriesWrapper}>
          {parsedCategories.length > 0 &&
            parsedCategories.map((expenseLine, index) => (
              <Layout key={index} style={homeScreenStyles.categoriesLineWrapper} level="4">
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
          {parsedCategories.length <= 0 && (
            <Layout level="4" style={homeScreenStyles.noCategoriesWrapper}>
              <Text appearance="hint" style={homeScreenStyles.noCategoriesHint}>
                There is no expense categories yet. You can add them in Settings
              </Text>
            </Layout>
          )}
        </Layout>
      </ScrollView>
    </Layout>
  );
}
