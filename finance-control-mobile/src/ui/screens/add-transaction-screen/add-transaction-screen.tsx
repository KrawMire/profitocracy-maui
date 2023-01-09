import { TransactionTypes } from "objectsTypes/transaction/transaction-types";
import Transaction from "objectsTypes/transaction/transaction";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { AppGlobalState } from "appState/store";
import { TransactionsState } from "appState/transactions/types";
import { ExpensesState } from "appState/expenses/types";
import { Dispatch } from "redux";
import { addTransaction } from "appState/transactions/actions";
import Expense from "objectsTypes/expense";
import { specifyExpenses } from "appState/expenses/actions";

interface AddTransactionScreenProps {
  transactions: TransactionsState;
  expenses: ExpensesState;
  onAddTransaction: (transaction: Transaction, expenses: Expense[]) => void;
}

function AddTransactionScreenBase(props: AddTransactionScreenProps) {
  const [sum, setSum] = useState(0);
  const [transactionType, setTransactionType] = useState(TransactionTypes.Main);

  const handleChangeSum = (value: string) => {
    if (value.length === 0) {
      setSum(0);
      return;
    }

    setSum(parseFloat(value));
  }

  const onClear = () => {
    setSum(0);
  }

  const handleAddTransaction = () => {
    AsyncStorage.getItem('transactions').then(value => {
      const transactionToAdd = {
        sum: sum,
        type: transactionType
      };

      let newTransactions: string;

      if (value) {
        const oldTransactions = JSON.parse(value) as Transaction[];
        oldTransactions.unshift(transactionToAdd)
        newTransactions = JSON.stringify(oldTransactions)
      } else {
        newTransactions = JSON.stringify([transactionToAdd]);
      }

      if (props.expenses && props.expenses.length >= 4) {
        AsyncStorage.setItem('transactions', newTransactions).then(() => {
          AsyncStorage.getItem("EXPENSES")
          .then(value => {
            if (value) {
              const expenses = JSON.parse(value) as Expense[];
              const newExpenses = expenses.map(expense => {
                if (expense.header === "Main expenses" && transactionToAdd.type === TransactionTypes.Main) {
                  return {
                    ...expense,
                    actualExpenses: expense.actualExpenses + transactionToAdd.sum
                  }
                } else if (expense.header === "Secondary expenses" && transactionToAdd.type === TransactionTypes.Secondary) {
                  return {
                    ...expense,
                    actualExpenses: expense.actualExpenses + transactionToAdd.sum
                  }
                } else if (expense.header === "Postponed" && transactionToAdd.type === TransactionTypes.Postponed) {
                  return {
                    ...expense,
                    actualExpenses: expense.actualExpenses + transactionToAdd.sum
                  }
                } else if (expense.header === "Daily expenses") {
                  return {
                    ...expense,
                    actualExpenses: expense.actualExpenses + transactionToAdd.sum
                  }
                }

                return expense;
              });

              AsyncStorage.setItem("EXPENSES", JSON.stringify(newExpenses)).then(() => {
                props.onAddTransaction(transactionToAdd, newExpenses);
                onClear();
              });
            } else {
              throw Error("Expenses was not specified!");
            }

            onClear();
          });
        });
      }
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View  style={styles.container}>
        <Text style={styles.header}>Add transaction</Text>
        <Text style={styles.amountLabel}>Transaction sum</Text>
        <TextInput style={styles.amountTextInput} value={sum.toString()} onChangeText={handleChangeSum} keyboardType="numeric"/>
        <View style={styles.expenseTypeContainer}>
          <TouchableOpacity
            style={transactionType === TransactionTypes.Main ?
               styles.expenseTypeButtonActive : styles.expenseTypeButton}
            onPress={() => setTransactionType(TransactionTypes.Main)}
          >
            <Text style={transactionType === TransactionTypes.Main ?
                styles.expenseTypeButtonTextActive :
                styles.expenseTypeButtonText}
            >Main</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={transactionType === TransactionTypes.Secondary ?
              styles.expenseTypeButtonActive : styles.expenseTypeButton}
            onPress={() => setTransactionType(TransactionTypes.Secondary)}
          >
            <Text style={transactionType === TransactionTypes.Secondary ?
              styles.expenseTypeButtonTextActive :
              styles.expenseTypeButtonText}
            >Secondary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={transactionType === TransactionTypes.Postponed ?
              styles.expenseTypeButtonActive : styles.expenseTypeButton}
            onPress={() => setTransactionType(TransactionTypes.Postponed)}
          >
            <Text style={transactionType === TransactionTypes.Postponed ?
              styles.expenseTypeButtonTextActive :
              styles.expenseTypeButtonText}
            >Postponed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
          <LinearGradient colors={['#00A661', '#90FF87']} style={styles.addButtonGradient}>
            <Text style={styles.addButtonText}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F4F4F4',
    paddingTop: '10%'
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: "#5B5B5B",
    marginLeft: "5%",
    marginTop: "5%"
  },
  amountLabel: {
    marginTop: 25,
    marginLeft: "5%",
  },
  amountTextInput: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  addButtonGradient: {
    borderRadius: 10
  },
  expenseTypeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 25
  },
  expenseTypeButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#c2c0c0",
    width: "30%"
  },
  expenseTypeButtonActive: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#4ecf81",
    width: "30%"
  },
  expenseTypeButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    color: "#5B5B5B",
    padding: 15
  },
  expenseTypeButtonTextActive: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    padding: 15,
    textAlign: "center"
  },
  addButton: {
    width: "96%",
    backgroundColor: "#4EBC7A",
    marginRight: "2%",
    marginLeft: "2%",
    marginBottom: 5,
    borderRadius: 10
  },
  addButtonText: {
    textAlign: "center",
    padding: 20,
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF"
  }
});

const mapStateToProps = (state: AppGlobalState) => ({
  transactions: state.transactions,
  expenses: state.expenses
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddTransaction: (transaction: Transaction, expenses: Expense[]) => {
    dispatch(addTransaction(transaction));
    dispatch(specifyExpenses(expenses))
  }
})

export const AddTransactionScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionScreenBase)