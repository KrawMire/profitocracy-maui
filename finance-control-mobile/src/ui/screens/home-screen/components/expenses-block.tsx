import { StyleSheet, Text, View } from "react-native";

interface ExpensesBlockProps {
  header?: string | null;
  style?: object,
  actualExpenses: number,
  plannedExpenses: number
}

export function ExpensesBlock(props: ExpensesBlockProps) {
  let progressPercentage = 0;

  if (props.actualExpenses && props.plannedExpenses) {
    progressPercentage = props.actualExpenses / props.plannedExpenses * 100;
  }

  if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  const styles = StyleSheet.create({
    container: {
      width: '90%',
      height: 125,
      backgroundColor: '#fff',
      borderRadius: 10,

      // Shadow styles
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        height: 5,
        width: 0
      },
      ...props.style
    },
    header: {
      color: "#8A8A8A",
      fontSize: 12,
      padding: 15,
      paddingBottom: 10
    },
    expenseSums: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 15,
      marginLeft: 15
    },
    actualExpenseSum: {
      color: "#4F4F4F",
      fontWeight: '800',
      fontSize: 30
    },
    expenseText: {
      color: "#8A8A8A",
      fontSize: 10
    },
    plannedBlock: {
      marginTop: 15
    },
    plannedExpensesSum: {
      color: "#7E7E7E",
      fontWeight: '800',
      fontSize: 20
    },
    progressFull: {
      width: '90%',
      backgroundColor: "#D9D9D9",
      height: 10,
      borderRadius: 5,
      margin: 15
    },
    progressCurrent: {
      width: `${progressPercentage}%`,
      backgroundColor: "#6AD870",
      height: '100%',
      borderRadius: 5
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.header}</Text>
      <View style={styles.expenseSums}>
        <View>
          <Text style={styles.actualExpenseSum}>${props.actualExpenses}</Text>
          <Text style={styles.expenseText}>Actual</Text>
        </View>
        <View style={styles.plannedBlock}>
          <Text style={styles.plannedExpensesSum}>${props.plannedExpenses}</Text>
          <Text style={styles.expenseText}>Planned</Text>
        </View>
      </View>
      <View style={styles.progressFull}>
        <View style={styles.progressCurrent} />
      </View>
    </View>
  )
}