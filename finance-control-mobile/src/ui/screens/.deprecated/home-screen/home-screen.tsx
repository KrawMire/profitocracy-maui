import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import moment from "moment";


import { Divider } from "../../shared/divider";
import { ExpensesBlock } from "./components/expenses-block";
import { TotalBlock } from "./components/total-block";
import { AppGlobalState } from "appState/store";
import { connect } from "react-redux";
import { ExpensesState } from "appState/expenses/types";
import { TotalState } from "appState/total/types";
import AppState from "src/domain/app-state/app-state";

interface HomeScreenProps {
  expenses: ExpensesState;
  total: TotalState;
}

function HomeScreenBase(props: HomeScreenProps) {
  const [startPeriodDate, setStartPeriodDate] = useState(new Date(56667576576567));
  const [endPeriodDate, setEndPeriodDate] = useState(new Date(Date.now()));
  const expenses = props.expenses;

  moment.locale("en");
  const strStartDate = moment(startPeriodDate).format("DD MMM");
  const strEndDate = moment(endPeriodDate).format("DD MMM");
  const header = `Expenses for ${strStartDate} - ${strEndDate}`;
  const expensesSpecified = expenses && expenses.length >= 4;

  const renderExpenses = () => {
    const dailyExpenses = expenses[0];
    const expensesByType = expenses.slice(1, expenses.length);

    return (
      <ScrollView>
        <View  style={styles.container}>
          <Text style={styles.header}>{header}</Text>
          <TotalBlock totalSum={props.total} style={styles.expensesBlock} />
          <Divider />
            <ExpensesBlock
              header={dailyExpenses.header}
              actualExpenses={dailyExpenses.actualExpenses}
              plannedExpenses={dailyExpenses.plannedExpenses}
              style={{
                marginBottom: 25,
                ...styles.expensesBlock
              }}
            />
          <Divider />
          {expensesByType.map((expense, index) => (
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

  const renderNotSetMessage = () => (
    <View  style={styles.container}>
        <Text style={styles.header}>Set up your expenses in Settings</Text>
      </View>
  )

  if (expensesSpecified) {
    return renderExpenses();
  } else {
    return renderNotSetMessage();
  }
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

const mapStateToProps = (state: AppState) => ({
  expenses: state.expenses,
  total: state.totalBalance
});

export const HomeScreen = connect(
  mapStateToProps
)(HomeScreenBase)