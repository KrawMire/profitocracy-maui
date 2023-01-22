import { getNewId } from "utils/identifier";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import ExpenseType from "../../../domain/expense/components/expense-type";
import Transaction from "src/domain/transaction/transaction";
import { addTransaction } from "state/transactions/actions";
import { addTransactionScreenStyles } from "styles/screens/add-transaction.style";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function AddTransactionScreen(props: any) {
  // Global app state
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Local state
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseType, setExpenseType] = useState(ExpenseType.Main);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));

  // Input handlers
  const changeAmount = (value: string) => {
    const numAmount = Number(value);

    if (numAmount || value === "") {
      setAmount(value);
    }
  };

  const onAddTransaction = () => {
    const transactionAmount = Number(amount) ?? 0;
    const newTransaction: Transaction = {
      id: getNewId(),
      description,
      category,
      date,
      amount: transactionAmount,
      type: expenseType,
    };

    dispatch(addTransaction(newTransaction));
    onClear();
    navigation.navigate("Home" as never);
  };

  const onClear = () => {
    setAmount("");
    setDescription("");
    setExpenseType(ExpenseType.Main);
    setCategory("");
  }

  return (
    <View style={addTransactionScreenStyles.wrapper}>
      <Text>Add transaction</Text>
      <View style={addTransactionScreenStyles.wrapper}>
        <TextInput
          placeholder="Enter amount..."
          onChangeText={changeAmount}
          value={amount.toString()}
        />
        <View style={addTransactionScreenStyles.typeButtonGroup}>
          <Button title="Main" onPress={() => setExpenseType(ExpenseType.Main)}/>
          <Button title="Secondary" onPress={() => setExpenseType(ExpenseType.Secondary)}/>
          <Button title="Postpone" onPress={() => setExpenseType(ExpenseType.Postponed)}/>
        </View>
        <TextInput
          placeholder="Enter description..."
          onChangeText={setDescription}
          value={description}
        />
        <TextInput
          placeholder="Select category..."
          onChangeText={setCategory}
          value={category}
        />
      </View>
      <Button title="Add transaction" onPress={onAddTransaction} />
    </View>
  )
}