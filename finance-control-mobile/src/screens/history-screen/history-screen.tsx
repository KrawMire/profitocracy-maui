import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Transaction from "../../types/transaction";
import { HistoryTypeButtonGroup } from "./components/history-type-button-group";

export function HistoryScreen() {
  const [historyType, setHistoryType] = useState("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('transactions').then(value => {
      if (value) {
        const fetchedTransactions = JSON.parse(value) as Transaction[];
        setTransactions(fetchedTransactions);
      } else {
        setTransactions([]);
      }
    });
  });

  const handleChangeType = (type: string) => {
    setHistoryType(type);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
      <View style={styles.historyContainer}>
        <HistoryTypeButtonGroup onChangeType={handleChangeType} currentType={historyType}/>
        {/* TODO: refactor this */}
        {/* historyType === "all" &&
        <Text>All history</Text>}
        {historyType === "period" &&
        <Text>Period history</Text>}
        {historyType === "day" &&
        <Text>Day history</Text> */}
        <ScrollView style={styles.transactionsContainer}>
          {transactions.map((transaction, index) => (
            <View style={styles.transactionContainer} key={index}>
              <Text>{transaction.sum}</Text>
              <Text>{transaction.type}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F4F4F4',
    paddingTop: '10%',
    paddingBottom: '15%',

    flex: 1,
    flexDirection: 'column',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: "#5B5B5B",
    marginLeft: "5%",
    marginTop: "5%"
  },
  historyContainer: {
    height: '100%',
    alignItems: "center",
    flex: 1,
    flexDirection: 'column',
  },
  transactionsContainer: {

  },
  transactionContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        height: 5,
        width: 0
      },
  }
});