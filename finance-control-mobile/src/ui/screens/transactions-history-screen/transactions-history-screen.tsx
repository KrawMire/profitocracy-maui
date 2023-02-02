import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { removeTransaction } from "state/transactions/actions";

import { transactionsHistoryScreenStyles } from "styles/screens/transactions-history.style";
import { Divider } from "components/shared/divider";
import { sharedTextStyle } from "styles/shared/text.style";
import { Button, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";

export function TransactionsHisoryScreen() {
  const transactions = useSelector((state: AppState) => state.transactions.transactions);
  const dispatch = useDispatch();

  const clearTransactions = () => {
    transactions.forEach(transaction => {
      dispatch(removeTransaction(transaction.id));
    })
  };

  return (
    <Layout style={transactionsHistoryScreenStyles.wrapper}>
      <Text style={sharedTextStyle.screenTitle}>Transactions history</Text>
      <Button onPress={clearTransactions}>
        Clear all transactions
      </Button>
      <ScrollView>
        {transactions.map((transaction) => (
          <Layout key={transaction.id}>
            <Divider />
            <Text>
              {transaction.amount}
            </Text>
            <Text>
              {transaction.type}
            </Text>
            <Text>
              {transaction.category}
            </Text>
            <Text>
              {transaction.description}
            </Text>
          </Layout>
        ))}
      </ScrollView>
    </Layout>
  )
}