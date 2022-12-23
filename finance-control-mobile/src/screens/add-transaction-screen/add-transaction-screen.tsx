import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Transaction from "../../types/transaction";

export function AddTransactionScreen() {
  const [sum, setSum] = useState(0);
  const [transactionType, setTransactionType] = useState("main");

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

      AsyncStorage.setItem('transactions', newTransactions).then(() => {
        onClear();
      });
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View  style={styles.container}>
        <Text style={styles.header}>Add transaction</Text>
        <Text style={styles.amountLabel}>Transaction sum</Text>
        <TextInput style={styles.amountTextInput} value={sum.toString()} onChangeText={handleChangeSum} keyboardType="numeric"/>
        <View style={styles.expenseTypeContainer}>
          <TouchableOpacity style={styles.expenseTypeButton} onPress={() => setTransactionType("main")}>
            {transactionType === "main" ?
            <LinearGradient colors={['#00A661', '#90FF87']} style={styles.expenseTypeButtonGradient}>
              <Text style={styles.expenseTypeButtonTextActive}>Main</Text>
            </LinearGradient> :
            <Text style={styles.expenseTypeButtonText}>Main</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.expenseTypeButton} onPress={() => setTransactionType("secondary")}>
            {transactionType === "secondary" ?
            <LinearGradient colors={['#00A661', '#90FF87']} style={styles.expenseTypeButtonGradient}>
              <Text style={styles.expenseTypeButtonTextActive}>Secondary</Text>
            </LinearGradient> :
            <Text style={styles.expenseTypeButtonText}>Secondary</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.expenseTypeButton} onPress={() => setTransactionType("postponed")}>
            {transactionType === "postponed" ?
            <LinearGradient colors={['#00A661', '#90FF87']} style={styles.expenseTypeButtonGradient}>
              <Text style={styles.expenseTypeButtonTextActive}>Postponed</Text>
            </LinearGradient> :
            <Text style={styles.expenseTypeButtonText}>Postponed</Text>}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
          <Text style={styles.addButtonText}>Add</Text>
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
  expenseTypeButtonGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  expenseTypeButtonText: {
    textAlign: "center",
    color: "#5B5B5B",
    padding: 15
  },
  expenseTypeButtonTextActive: {
    color: "#FFFFFF",
    padding: 15,
    textAlign: "center"
  },
  addButton: {
    width: "90%",
    backgroundColor: "#4EBC7A",
    marginRight: "5%",
    marginLeft: "5%",
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