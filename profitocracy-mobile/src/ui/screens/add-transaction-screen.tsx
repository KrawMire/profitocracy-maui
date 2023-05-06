import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { Button, IndexPath, Input, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { SpendType } from "domain/spending";
import { AppState } from "state/app-state";
import { Transaction } from "domain/transaction";
import { addTransactionScreenStyles } from "styles/screens/add-transaction-screen.style";
import { getNewId } from "utils/uuid/get-new-id";
import { isNullOrZero } from "utils/numbers/null-check";
import { addTransaction } from "state/transactions/actions";
import { showError } from "utils/toast/show-error";

export function AddTransactionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currencyRates = useSelector((state: AppState) => state.currencyRates);
  const categories = useSelector((state: AppState) => state.categories);

  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [spendType, setSpendType] = useState(SpendType.Main);
  const [categoryIndex, setCategoryIndex] = useState<IndexPath | null>(null);
  const [currencyIndex, setCurrencyIndex] = useState(new IndexPath(0));

  const date = new Date(Date.now());

  const onChangeAmount = (value: string) => {
    if (value === "") {
      setAmount(null);
      return;
    }

    const numAmount = Number(value);

    if (numAmount) {
      setAmount(numAmount);
    }
  };

  const onAddTransaction = () => {
    const isValidated = validateTransaction(amount);

    if (!isValidated || !amount) {
      return;
    }

    processAddTransaction(amount);
    onClear();
    navigation.navigate("home" as never);
  };

  const onClearCategory = () => {
    setCategoryIndex(null);
  };

  const validateTransaction = (transactionAmount: number | null): boolean => {
    if (isNullOrZero(transactionAmount)) {
      showMessage({
        message: "Transaction amount is invalid!",
        type: "danger",
      });

      return false;
    }

    return true;
  };

  const getMainCurrencyAmount = () => {
    const transactionCurrency = currencyRates[currencyIndex.row];

    if (!transactionCurrency) {
      showError("Invalid currency code was given!");
      return 0;
    }

    if (!amount) {
      return 0;
    }

    const convertedAmount = amount / transactionCurrency.rate;

    return Number(convertedAmount.toFixed(2));
  };

  const processAddTransaction = (transactionAmount: number) => {
    const category = categoryIndex ? categories[categoryIndex.row] : null;
    const currency = currencyRates[currencyIndex.row].currency;

    const newTransaction: Transaction = {
      id: getNewId(),
      description,
      category: category,
      date: date,
      currency: currency,
      amount: transactionAmount,
      mainCurrencyAmount: getMainCurrencyAmount(),
      spendType: spendType,
    };

    dispatch(addTransaction(newTransaction));
  };

  const onClear = () => {
    setAmount(null);
    setDescription("");
    setSpendType(SpendType.Main);
    setCategoryIndex(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={addTransactionScreenStyles.wrapper} level="4">
        <Text category="h1">Add transaction</Text>
        <Layout style={addTransactionScreenStyles.transactionFormWrapper} level="4">
          <Layout style={addTransactionScreenStyles.amountWrapper} level="4">
            <Input
              placeholder="Enter amount..."
              onChangeText={onChangeAmount}
              value={amount?.toString()}
              keyboardType="numeric"
              style={addTransactionScreenStyles.amountInput}
            />
            <Select
              style={addTransactionScreenStyles.currencySelect}
              value={currencyRates[currencyIndex.row].currency.symbol}
              onSelect={(index) => setCurrencyIndex(index as IndexPath)}
            >
              {currencyRates.map((availableCurrency) => (
                <SelectItem key={availableCurrency.currency.code} title={availableCurrency.currency.name} />
              ))}
            </Select>
          </Layout>
          <Layout style={addTransactionScreenStyles.typeButtonGroup} level="4">
            <Button
              onPress={() => setSpendType(SpendType.Main)}
              appearance={spendType === SpendType.Main ? "outline" : "filled"}
              style={addTransactionScreenStyles.typeButton}
            >
              Main
            </Button>
            <Button
              onPress={() => setSpendType(SpendType.Secondary)}
              appearance={spendType === SpendType.Secondary ? "outline" : "filled"}
              style={addTransactionScreenStyles.typeButton}
            >
              Secondary
            </Button>
            <Button
              onPress={() => setSpendType(SpendType.Saved)}
              appearance={spendType === SpendType.Saved ? "outline" : "filled"}
              style={addTransactionScreenStyles.typeButton}
            >
              Save
            </Button>
          </Layout>
          <Input
            placeholder="Enter description..."
            onChangeText={setDescription}
            value={description}
            style={addTransactionScreenStyles.descriptionInput}
          />
          <Layout level="4" style={addTransactionScreenStyles.categorySelectWrapper}>
            <Select
              value={categoryIndex ? categories[categoryIndex.row].name : undefined}
              placeholder="Select category..."
              style={addTransactionScreenStyles.categorySelect}
              onSelect={(index) => setCategoryIndex(index as IndexPath)}
            >
              {categories.length ? (
                categories.map((category) => <SelectItem key={category.name} title={category.name} />)
              ) : (
                <SelectItem disabled title="No categories exists" />
              )}
            </Select>
            <Button style={addTransactionScreenStyles.clearCategorySelectButton} onPress={onClearCategory}>
              Clear
            </Button>
          </Layout>
          <Button onPress={onAddTransaction} style={addTransactionScreenStyles.addButton}>
            Add transaction
          </Button>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
