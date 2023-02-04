import { getNewId } from "utils/identifier";
import { useDispatch } from "react-redux";
import ExpenseType from "../../../domain/expense/components/expense-type";
import Transaction from "src/domain/transaction/transaction";
import { addTransaction } from "state/transactions/actions";
import { addTransactionScreenStyles } from "styles/screens/add-transaction.style";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { sharedTextStyle } from "styles/shared/text.style";
import { Button, ButtonGroup, Input, Layout, Text } from "@ui-kitten/components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function AddTransactionScreen() {
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
    console.log(navigation)
    navigation.navigate("home" as never);

  };

  const onClear = () => {
    setAmount("");
    setDescription("");
    setExpenseType(ExpenseType.Main);
    setCategory("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={addTransactionScreenStyles.wrapper}>
        <Text style={sharedTextStyle.screenTitle}>Add transaction</Text>
        <Layout style={addTransactionScreenStyles.wrapper}>
          <Input
            placeholder="Enter amount..."
            onChangeText={changeAmount}
            value={amount.toString()}
            keyboardType="numeric"
          />
          <ButtonGroup>
            <Button onPress={() => setExpenseType(ExpenseType.Main)}>Main</Button>
            <Button onPress={() => setExpenseType(ExpenseType.Secondary)}>Secondary</Button>
            <Button onPress={() => setExpenseType(ExpenseType.Postponed)}>Postpone</Button>
          </ButtonGroup>
          <Input
            placeholder="Enter description..."
            onChangeText={setDescription}
            value={description}
          />
          <Input
            placeholder="Select category..."
            onChangeText={setCategory}
            value={category}
          />
        </Layout>
        <Button onPress={onAddTransaction}>Add transaction</Button>
      </Layout>
    </TouchableWithoutFeedback>
  )
}