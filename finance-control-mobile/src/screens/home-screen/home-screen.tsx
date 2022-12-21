import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ExpensesBlock } from "./components/expenses-block";
import { TotalBlock } from "./components/total-block";

export function HomeScreen() {
  const mockData = [
    {
      header: "Main expenses",
      actualExpenses: 5000,
      plannedExpenses: 10000
    },
    {
      header: "Secondary expenses",
      actualExpenses: 1000,
      plannedExpenses: 5000
    },
    {
      header: "Postponed",
      actualExpenses: 3000,
      plannedExpenses: 5000
    }
  ];

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#F4F4F4',
      alignItems: 'center',
      paddingTop: '10%',
      paddingBottom: '15%',

      flex: 1,
      flexDirection: 'column',
    },
    header: {
      fontSize: 20,
      fontWeight: '600',
      padding: 25
    },
    expensesBlock: {
      marginTop: 25
    }
  });

  return (
    <ScrollView>
      <View  style={styles.container}>
        <Text style={styles.header}>Expenses for 10-25 Dec</Text>
        <TotalBlock totalSum={20000}/>
        {mockData.map((expense, index) => (
          <ExpensesBlock
            key={index}
            style={styles.expensesBlock}
            header={expense.header}
            actualExpenses={expense.actualExpenses}
            plannedExpenses={expense.plannedExpenses}
          />
        ))}
      </View>
    </ScrollView>
  );
}