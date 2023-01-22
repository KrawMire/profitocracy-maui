import { Button, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { removeTransaction } from "state/transactions/actions";

import { transactionsHistoryScreenStyles } from "styles/screens/transactions-history.style";
import { Divider } from "sharedUI/divider";

export function TransactionsHisoryScreen() {
  const transactions = useSelector((state: AppState) => state.transactions.transactions);
  const dispatch = useDispatch();

  const clearTransactions = () => {
    transactions.forEach(transaction => {
      dispatch(removeTransaction(transaction.id));
    })
  };

  return (
    <View style={transactionsHistoryScreenStyles.wrapper}>
      <Text>Transactions history</Text>
      <Button title="Clear all transactions" onPress={clearTransactions}/>
      <ScrollView>
        {transactions.map((transaction) => (
          <View key={transaction.id}>
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
          </View>
        ))}
      </ScrollView>
    </View>
  )
}