import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import ExpenseType from "../../../domain/expense/components/expense-type";
import { setInitialBalance } from "state/total-balance/actions";
import { totalBalanceStepStyles } from "styles/components/set-up-screen/total-balance.style";
import { isNullOrZero } from "utils/null-check";
import { updateExpense } from "state/expenses/actions";

export interface TotalBalanceStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function TotalBalanceStep(props: TotalBalanceStepProps) {
  const dispatch = useDispatch();

  const mainExpense = useSelector((state: AppState) => state.expenses.expenses.find((expense) => expense.expenseType === ExpenseType.Main));
  const secondaryExpense = useSelector((state: AppState) => state.expenses.expenses.find((expense) => expense.expenseType === ExpenseType.Secondary));
  const postponed = useSelector((state: AppState) => state.expenses.expenses.find((expense) => expense.expenseType === ExpenseType.Postponed));
  const expensesSettings = useSelector((state: AppState) => state.settings.settings.expensesSettings);

  const [balance, setBalance] = useState("");

  const setInitialBalanceOperation = (balance: number) => {
    let mainExpenseSettings = expensesSettings.find((settings) => settings.expenseType === ExpenseType.Main);
    let secondaryExpenseSettings = expensesSettings.find((settings) => settings.expenseType === ExpenseType.Secondary);
    let postponedExpenseSettings = expensesSettings.find((settings) => settings.expenseType === ExpenseType.Postponed);

    const mainExpenseSum = balance * mainExpenseSettings!.percent / 100;
    const secondaryExpenseSum = balance * secondaryExpenseSettings!.percent / 100;
    const postponedSum = balance * postponedExpenseSettings!.percent / 100;

    mainExpense!.actualAmount = mainExpenseSum;
    secondaryExpense!.actualAmount = secondaryExpenseSum;
    postponed!.actualAmount = postponedSum;

    dispatch(setInitialBalance(balance));
    dispatch(updateExpense(mainExpense!));
    dispatch(updateExpense(secondaryExpense!));
    dispatch(updateExpense(postponed!));
  }

  const onMoveNextClick = () => {
    const parsedBalance = Number(balance);

    if (isNullOrZero(parsedBalance)) {
      showMessage({
        message: "Invalid value of balance!",
        type: "danger"
      });

      return;
    }

    setInitialBalanceOperation(parsedBalance);
    props.onMoveNext();
  };

  return (
    <Layout>
      <Input
        label="Initial balance"
        placeholder="Enter your initial balance..."
        keyboardType="numeric"
        onChangeText={setBalance}
      />
      <Layout style={totalBalanceStepStyles.moveButtonsContainer}>
        <Button onPress={props.onMoveBack}>
          Back
        </Button>
        <Button onPress={onMoveNextClick}>
          Next
        </Button>
      </Layout>
    </Layout>
  )
}