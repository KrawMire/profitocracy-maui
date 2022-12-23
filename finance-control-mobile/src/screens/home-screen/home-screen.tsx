import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import moment from "moment";


import { Divider } from "../../shared/divider";
import { ExpensesBlock } from "./components/expenses-block";
import { TotalBlock } from "./components/total-block";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Expense from "../../types/expense";

export function HomeScreen() {
  const [startPeriodDate, setStartPeriodDate] = useState(new Date(56667576576567));
  const [endPeriodDate, setEndPeriodDate] = useState(new Date(Date.now()));
  const [expenses, setExpenses] = useState<Expense[]>([]);

  moment.locale("en");
  const strStartDate = moment(startPeriodDate).format("DD MMM");
  const strEndDate = moment(endPeriodDate).format("DD MMM");
  const header = `Expenses for ${strStartDate} - ${strEndDate}`;

  return (
    <ScrollView>
      <View  style={styles.container}>
        <Text style={styles.header}>{header}</Text>
        <TotalBlock totalSum={20000} style={styles.expensesBlock} />
        <Divider />
          <ExpensesBlock
            header="Daily expenses"
            actualExpenses={1500}
            plannedExpenses={3000}
            style={{
              marginBottom: 25,
              ...styles.expensesBlock
            }}
          />
        <Divider />
        {expenses && expenses.map((expense, index) => (
          <ExpensesBlock
            key={index}
            header={expense.header}
            actualExpenses={expense.actualExpenses}
            plannedExpenses={expense.plannedExpenses}
            style={styles.expensesBlock}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F4F4F4',
    paddingTop: '10%',
    paddingBottom: "5%"
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: "#5B5B5B",
    marginLeft: "5%",
    marginTop: "5%"
  },
  expensesBlock: {
    marginTop: 25,
    marginRight: "5%",
    marginLeft: "5%",
  }
});