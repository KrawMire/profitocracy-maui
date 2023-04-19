import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { removeTransaction } from "state/transactions/actions";

import { transactionsHistoryScreenStyles } from "styles/screens/transactions-history.style";
import { Button, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { TransactionCard } from "components/transactions-history-screen/transaction-card";

export function TransactionsHistoryScreen() {
  const dispatch = useDispatch();

  const currencyRates = useSelector((state: AppState) => state.currencies.availableCurrencies);
  const mainCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const transactions = useSelector((state: AppState) => state.transactions.transactions);
  const categories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);

  const clearTransactions = () => {
    transactions.forEach(transaction => {
      dispatch(removeTransaction(transaction.id));
    });
  };

  return (
    <Layout
      style={transactionsHistoryScreenStyles.wrapper}
      level="4"
    >
      <Text category="h1">Transactions history</Text>
      <Button
        onPress={clearTransactions}
        style={transactionsHistoryScreenStyles.clearButton}
      >
        Clear all transactions
      </Button>
      <ScrollView
        style={transactionsHistoryScreenStyles.transactionsListWrapper}
      >
        {transactions.map((transaction) => (
          <TransactionCard
            transaction={transaction}
            mainCurrency={mainCurrency}
            currencyRates={currencyRates}
            categories={categories}
          />
        ))}
      </ScrollView>
    </Layout>
  )
}