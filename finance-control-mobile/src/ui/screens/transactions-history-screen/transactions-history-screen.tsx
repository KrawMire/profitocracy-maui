import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { removeTransaction } from "state/transactions/actions";

import { transactionsHistoryScreenStyles } from "styles/screens/transactions-history.style";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { getCategoryName } from "./actions/expense-category";
import {
  convertToBaseCurrency,
  getCurrencySymbolByCode
} from "screens/transactions-history-screen/actions/currency-operations";

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
      <Button onPress={clearTransactions}>
        Clear all transactions
      </Button>
      <ScrollView>
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <Text>
              {transaction.amount}{getCurrencySymbolByCode(transaction.currencyCode, currencyRates)}
            </Text>
            <Text>
              {convertToBaseCurrency(transaction, currencyRates)}{mainCurrency.symbol}
            </Text>
            <Text>
              {transaction.type}
            </Text>
            <Text>
              {getCategoryName(transaction.category, categories)}
            </Text>
            <Text>
              {transaction.description}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </Layout>
  )
}