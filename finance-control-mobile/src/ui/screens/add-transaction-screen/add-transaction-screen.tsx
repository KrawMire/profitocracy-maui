import { getNewId } from "utils/identifier";
import { useDispatch, useSelector } from "react-redux";
import ExpenseType from "../../../domain/expense/components/expense-type";
import Transaction from "src/domain/transaction/transaction";
import { addTransaction } from "state/transactions/actions";
import { addTransactionScreenStyles } from "styles/screens/add-transaction.style";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import AppState from "src/domain/app-state/app-state";
import { isNullOrZero } from "utils/null-check";
import { showMessage } from "react-native-flash-message";
import ExpenseCategory from "src/domain/expense-category/expense-category";

export function AddTransactionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const categories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);
  const mainCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const currencies = useSelector((state: AppState) => state.currencies.availableCurrencies);

  const [currency, setCurrency] = useState(mainCurrency);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseType, setExpenseType] = useState(ExpenseType.Main);
  const [expenseCategory, setCategory] = useState<ExpenseCategory | null>(null);

  const date = new Date(Date.now());

  const changeAmount = (value: string) => {
    const numAmount = Number(value);

    if (numAmount || value === "") {
      setAmount(value);
    }
  };

  const onAddTransaction = () => {
    const transactionAmount = Number(amount);
    const isValidated = validateTransaction(transactionAmount);

    if (!isValidated) {
      return;
    }

    processAddTransaction(transactionAmount);
    onClear();
    navigation.navigate("home" as never);
  };

  const validateTransaction = (transactionAmount: number): boolean => {
    if (isNullOrZero(transactionAmount)) {
      showMessage({
        message: "Transaction amount is invalid!",
        type: "danger"
      })
      return false;
    }

    return true;
  }

  const processAddTransaction = (transactionAmount: number) => {
    const newTransaction: Transaction = {
      id: getNewId(),
      description,
      category: expenseCategory ? expenseCategory.id : "",
      date,
      currencyCode: currency.code,
      amount: transactionAmount,
      type: expenseType,
    };

    dispatch(addTransaction(newTransaction));
  }

  const onClearCategory = () => {
    setCategory(null);
  }

  const onClear = () => {
    setAmount("");
    setDescription("");
    setExpenseType(ExpenseType.Main);
    setCategory(null);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout
        style={addTransactionScreenStyles.wrapper}
        level="4"
      >
        <Text category="h1">Add transaction</Text>
        <Layout
          style={addTransactionScreenStyles.transactionFormWrapper}
          level="4"
        >
          <Layout
            style={addTransactionScreenStyles.amountWrapper}
            level="4"
          >
            <Input
              placeholder="Enter amount..."
              onChangeText={changeAmount}
              value={amount.toString()}
              keyboardType="numeric"
              style={addTransactionScreenStyles.amountInput}
            />
            <Select
              style={addTransactionScreenStyles.currencySelect}
              value={currency.symbol}
            >
              {currencies.map((availableCurrency) => (
                <SelectItem
                  title={availableCurrency.currency.name}
                  onPress={() => setCurrency(availableCurrency.currency)}
                />
              ))}
            </Select>
          </Layout>
          <Layout
            style={addTransactionScreenStyles.typeButtonGroup}
            level="4"
          >
            <Button
              onPress={() => setExpenseType(ExpenseType.Main)}
              appearance={expenseType === ExpenseType.Main ? "outline" : "filled"}
            >
              Main
            </Button>
            <Button
              onPress={() => setExpenseType(ExpenseType.Secondary)}
              appearance={expenseType === ExpenseType.Secondary ? "outline" : "filled"}
            >
              Secondary
            </Button>
            <Button
              onPress={() => setExpenseType(ExpenseType.Postponed)}
              appearance={expenseType === ExpenseType.Postponed ? "outline" : "filled"}
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
          <Layout
            level="4"
            style={addTransactionScreenStyles.categorySelectWrapper}
          >
            <Select
              value={expenseCategory?.name}
              placeholder="Select category..."
              style={addTransactionScreenStyles.categorySelect}
            >
              {categories.length ?
                categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    title={category.name}
                    onPress={() => setCategory(category)}
                  />
                )) : (
                  <SelectItem
                    disabled
                    title="No categories exists"
                  />
                )
              }
            </Select>
            <Button
              style={addTransactionScreenStyles.clearCategorySelectButton}
              onPress={onClearCategory}
            >
              Clear
            </Button>
          </Layout>
          <Button
            onPress={onAddTransaction}
            style={addTransactionScreenStyles.addButton}
          >
            Add transaction
          </Button>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  )
}