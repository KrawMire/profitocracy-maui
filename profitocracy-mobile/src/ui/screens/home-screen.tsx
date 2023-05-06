import { Card, Layout, Text } from "@ui-kitten/components";
import { homeScreenStyles } from "styles/screens/home-screen.style";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getActualBalanceOperation } from "operations/home-screen/balance/get-actual-balance.operation";
import { AppState } from "state/app-state";
import { getCurrentPeriodTransactionsOperation } from "operations/home-screen/transactions/get-current-period-transactions.operation";
import { getCurrentAnchorDateOperation } from "operations/common/anchor-dates/get-current-anchor-date.operation";
import { getCurrentDate, getCurrentDay } from "utils/dates/get-current-day";
import { AnchorDate } from "domain/anchor-date";
import { addAnchorDate } from "state/anchor-dates/actions";
import { getNextAnchorDate } from "operations/home-screen/anchor-dates/get-next-anchor-date";
import { getDailyBalance } from "operations/home-screen/balance/get-daily-balance.operation";
import { Spending } from "domain/spending";
import { roundNumber } from "utils/numbers/convert-number";

export function HomeScreen() {
  const dispatch = useDispatch();

  const mainCurrency = useSelector((state: AppState) => state.settings.mainCurrency);
  const anchorDates = useSelector((state: AppState) => state.anchorDates);
  const transactions = useSelector((state: AppState) => state.transactions);
  const anchorDays = useSelector((state: AppState) => state.settings.anchorDays);

  const currentAnchorDate = anchorDates[anchorDates.length - 1];
  const anchorDate = new Date(currentAnchorDate.date);
  const anchorBalance = currentAnchorDate.balance;

  const anchorDateFromToday = getCurrentAnchorDateOperation(anchorDays, getCurrentDay());
  const nextAnchorDate = getNextAnchorDate(anchorDate, anchorDays);

  const currentPeriodTransactions = getCurrentPeriodTransactionsOperation(transactions, anchorDate);
  const actualBalance = getActualBalanceOperation(anchorBalance, currentPeriodTransactions);

  if (anchorDateFromToday.setHours(0, 0, 0, 0) !== anchorDate.setHours(0, 0, 0, 0)) {
    const newAnchorDate: AnchorDate = {
      date: anchorDateFromToday,
      balance: actualBalance,
    };

    dispatch(addAnchorDate(newAnchorDate));
  }

  const dailyBalanceInitial = getDailyBalance(anchorBalance, anchorDate, nextAnchorDate);
  const dailyBalanceActual = getDailyBalance(actualBalance, getCurrentDate(), nextAnchorDate);

  const mainSpending: Spending = {
    plannedAmount: roundNumber(anchorBalance * 0.5),
    actualAmount: 0,
  };

  const secondarySpending: Spending = {
    plannedAmount: roundNumber(anchorBalance * 0.3),
    actualAmount: 0,
  };

  const savedAmount: Spending = {
    plannedAmount: roundNumber(anchorBalance * 0.2),
    actualAmount: 0,
  };

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
            Initial balance: {anchorBalance}
            {mainCurrency.symbol}
          </Text>
          <Text>
            Actual balance: {actualBalance ?? 0}
            {mainCurrency.symbol}
          </Text>
        </Card>

        <View>
          <Text category="h4" style={homeScreenStyles.sectionHeader}>
            Cash for the day
          </Text>
          <Layout style={homeScreenStyles.dailyCashWrapper} level="4">
            <Card header={renderHeader("From initial")} status="success" style={homeScreenStyles.dailyCashCard}>
              <Text>
                {dailyBalanceInitial}
                {mainCurrency.symbol}
              </Text>
            </Card>
            <Card header={renderHeader("From actual")} status="success" style={homeScreenStyles.dailyCashCard}>
              <Text>
                {dailyBalanceActual}
                {mainCurrency.symbol}
              </Text>
            </Card>
          </Layout>
        </View>

        <Text category="h4" style={homeScreenStyles.sectionHeader}>
          Spending types
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card header={renderHeader("Main spending")} style={homeScreenStyles.infoCard} status="info">
            <Text>
              {mainSpending.plannedAmount}
              {mainCurrency.symbol}
            </Text>
            <Text>
              {mainSpending.actualAmount}
              {mainCurrency.symbol}
            </Text>
          </Card>
          <Card header={renderHeader("Secondary spending")} style={homeScreenStyles.infoCard} status="info">
            <Text>
              {secondarySpending.plannedAmount}
              {mainCurrency.symbol}
            </Text>
            <Text>
              {secondarySpending.actualAmount}
              {mainCurrency.symbol}
            </Text>
          </Card>
          <Card header={renderHeader("Saved")} style={homeScreenStyles.infoCard} status="info">
            <Text>
              {savedAmount.plannedAmount}
              {mainCurrency.symbol}
            </Text>
            <Text>
              {savedAmount.actualAmount}
              {mainCurrency.symbol}
            </Text>
          </Card>
        </ScrollView>

        {/*<Text category="h4" style={homeScreenStyles.sectionHeader}>*/}
        {/*  Expense categories*/}
        {/*</Text>*/}
        {/*<Layout level="4" style={homeScreenStyles.categoriesWrapper}>*/}
        {/*  {parsedCategories.length > 0 &&*/}
        {/*    parsedCategories.map((expenseLine, index) => (*/}
        {/*      <Layout key={index} style={homeScreenStyles.categoriesLineWrapper} level="4">*/}
        {/*        {expenseLine.map((category) => (*/}
        {/*          <Card*/}
        {/*            key={category.id}*/}
        {/*            header={renderHeader(category.name)}*/}
        {/*            style={homeScreenStyles.categoryCard}*/}
        {/*            status="danger"*/}
        {/*          >*/}
        {/*            <Text>{category.plannedAmount}</Text>*/}
        {/*          </Card>*/}
        {/*        ))}*/}
        {/*      </Layout>*/}
        {/*    ))}*/}
        {/*  {parsedCategories.length <= 0 && (*/}
        {/*    <Layout level="4" style={homeScreenStyles.noCategoriesWrapper}>*/}
        {/*      <Text appearance="hint" style={homeScreenStyles.noCategoriesHint}>*/}
        {/*        There is no expense categories yet. You can add them in Settings*/}
        {/*      </Text>*/}
        {/*    </Layout>*/}
        {/*  )}*/}
        {/*</Layout>*/}
      </ScrollView>
    </Layout>
  );
}
