import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { Keyboard, TouchableWithoutFeedback, Vibration } from "react-native";
import ExpenseType from "../../../domain/expense/components/expense-type";
import AppState from "src/domain/app-state/app-state";
import ExpenseCategory from "src/domain/expense-category/expense-category";
import Transaction from "src/domain/transaction/transaction";
import { addTransactionScreenStyles } from "styles/screens/add-transaction.style";
import { getNewId } from "utils/identifier";
import { isNullOrZero } from "utils/null-check";
import { addTransaction } from "state/transactions/actions";

export function AddTransactionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const categories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);
  const mainCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const currencies = useSelector((state: AppState) => state.currencies.availableCurrencies);

  const [currency, setCurrency] = useState(mainCurrency);
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [expenseType, setExpenseType] = useState(ExpenseType.Main);
  const [expenseCategory, setCategory] = useState<ExpenseCategory | null>(null);

  const date = new Date(Date.now());

  const changeAmount = (value: string) => {
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

    Vibration.vibrate();
    processAddTransaction(amount);
    onClear();
    navigation.navigate("home" as never);
  };

  const onClearCategory = () => {
    setCategory(null);
  };

  const validateTransaction = (transactionAmount: number | null): boolean => {
    if (isNullOrZero(transactionAmount)) {
      showMessage({
        message: "Transaction amount is invalid!",
        type: "danger",
      });
      Vibration.vibrate();

      return false;
    }

    return true;
  };

  const getBaseCurrencyAmount = () => {
    const transactionCurrency = currencies.find((currencyRate) => currencyRate.currency.code === currency.code);

    if (!transactionCurrency) {
      showMessage({
        message: "Invalid currency code was given!",
        type: "danger",
      });
      Vibration.vibrate();

      return 0;
    }

    if (!amount) {
      return 0;
    }

    const convertedAmount = amount / transactionCurrency.rate;

    return Number(convertedAmount.toFixed(2));
  };

  const processAddTransaction = (transactionAmount: number) => {
    const newTransaction: Transaction = {
      id: getNewId(),
      description,
      category: expenseCategory ? expenseCategory.id : "",
      date,
      currencyCode: currency.code,
      amount: transactionAmount,
      baseCurrencyAmount: getBaseCurrencyAmount(),
      type: expenseType,
    };

    dispatch(addTransaction(newTransaction));
  };

  const onClear = () => {
    setAmount(null);
    setDescription("");
    setExpenseType(ExpenseType.Main);
    setCategory(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={addTransactionScreenStyles.wrapper} level="4">
        <Text category="h1">Add transaction</Text>
        <Layout style={addTransactionScreenStyles.transactionFormWrapper} level="4">
          <Layout style={addTransactionScreenStyles.amountWrapper} level="4">
            <Input
              placeholder="Enter amount..."
              onChangeText={changeAmount}
              value={amount?.toString()}
              keyboardType="numeric"
              style={addTransactionScreenStyles.amountInput}
            />
            <Select style={addTransactionScreenStyles.currencySelect} value={currency.symbol}>
              {currencies.map((availableCurrency) => (
                <SelectItem
                  key={availableCurrency.currency.code}
                  title={availableCurrency.currency.name}
                  onPress={() => setCurrency(availableCurrency.currency)}
                />
              ))}
            </Select>
          </Layout>
          <Layout style={addTransactionScreenStyles.typeButtonGroup} level="4">
            <Button
              onPress={() => setExpenseType(ExpenseType.Main)}
              appearance={expenseType === ExpenseType.Main ? "outline" : "filled"}
              style={addTransactionScreenStyles.typeButton}
            >
              Main
            </Button>
            <Button
              onPress={() => setExpenseType(ExpenseType.Secondary)}
              appearance={expenseType === ExpenseType.Secondary ? "outline" : "filled"}
              style={addTransactionScreenStyles.typeButton}
            >
              Secondary
            </Button>
            <Button
              onPress={() => setExpenseType(ExpenseType.Postponed)}
              appearance={expenseType === ExpenseType.Postponed ? "outline" : "filled"}
              style={addTransactionScreenStyles.typeButton}
            >
              Postpone
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
              value={expenseCategory?.name}
              placeholder="Select category..."
              style={addTransactionScreenStyles.categorySelect}
            >
              {categories.length ? (
                categories.map((category) => (
                  <SelectItem key={category.id} title={category.name} onPress={() => setCategory(category)} />
                ))
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
