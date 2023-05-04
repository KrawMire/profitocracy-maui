import { Button, Input, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import ExpenseType from "../../../domain/expense/components/expense-type";
import { setInitialBalance } from "state/total-balance/actions";
import { totalBalanceStepStyles } from "styles/components/set-up-screen/total-balance.style";
import { isNullOrZero } from "utils/null-check";
import { updateExpense } from "state/expenses/actions";
import { CurrencyRate } from "domain/app-state/components/currency-state";
import { ScrollView, Vibration } from "react-native";

interface CurrencyBalance {
  balance: number;
  currencyCode: string;
  currencySymbol: string;
}

export interface TotalBalanceStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function TotalBalanceStep(props: TotalBalanceStepProps) {
  const dispatch = useDispatch();

  const mainExpense = useSelector((state: AppState) =>
    state.expenses.expenses.find((expense) => expense.expenseType === ExpenseType.Main),
  );
  const secondaryExpense = useSelector((state: AppState) =>
    state.expenses.expenses.find((expense) => expense.expenseType === ExpenseType.Secondary),
  );
  const postponed = useSelector((state: AppState) =>
    state.expenses.expenses.find((expense) => expense.expenseType === ExpenseType.Postponed),
  );
  const expensesSettings = useSelector((state: AppState) => state.settings.settings.expensesSettings);
  const currencyRates = useSelector((state: AppState) => state.currencies.availableCurrencies);
  const mainCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const totalBalance = useSelector((state: AppState) => state.totalBalance.initialBalance);

  const [currencyBalances, setCurrencyBalance] = useState<CurrencyBalance[]>([
    {
      balance: totalBalance ?? 0,
      currencyCode: mainCurrency.code,
      currencySymbol: mainCurrency.symbol,
    },
  ]);

  const setInitialBalanceOperation = (balance: number) => {
    const mainExpenseSettings = expensesSettings.find((settings) => settings.expenseType === ExpenseType.Main);
    const secondaryExpenseSettings = expensesSettings.find(
      (settings) => settings.expenseType === ExpenseType.Secondary,
    );
    const postponedExpenseSettings = expensesSettings.find(
      (settings) => settings.expenseType === ExpenseType.Postponed,
    );

    if (
      !mainExpense ||
      !secondaryExpense ||
      !postponed ||
      !mainExpenseSettings ||
      !secondaryExpenseSettings ||
      !postponedExpenseSettings
    ) {
      throw new Error("Internal error!");
    }

    const mainExpenseSum = (balance * mainExpenseSettings.percent) / 100;
    const secondaryExpenseSum = (balance * secondaryExpenseSettings.percent) / 100;
    const postponedSum = (balance * postponedExpenseSettings.percent) / 100;

    mainExpense.plannedAmount = mainExpenseSum;
    secondaryExpense.plannedAmount = secondaryExpenseSum;
    postponed.plannedAmount = postponedSum;

    dispatch(setInitialBalance(balance));
    dispatch(updateExpense(mainExpense));
    dispatch(updateExpense(secondaryExpense));
    dispatch(updateExpense(postponed));
  };

  const changeBalance = (balanceStr: string, index: number) => {
    const balance = Number(balanceStr);
    const newCurrencyBalances = [...currencyBalances];
    newCurrencyBalances[index].balance = balance;

    setCurrencyBalance(newCurrencyBalances);
  };
  const changeCurrency = (currencyRate: CurrencyRate, index: number) => {
    const { code, symbol } = currencyRate.currency;
    const newCurrencyBalances = [...currencyBalances];
    newCurrencyBalances[index].currencyCode = code;
    newCurrencyBalances[index].currencySymbol = symbol;

    setCurrencyBalance(newCurrencyBalances);
  };

  const onAddNewBalance = () => {
    const newCurrencyBalances: CurrencyBalance[] = [
      ...currencyBalances,
      {
        balance: 0,
        currencyCode: mainCurrency.code,
        currencySymbol: mainCurrency.symbol,
      },
    ];

    setCurrencyBalance(newCurrencyBalances);
  };

  const onMoveNextClick = () => {
    const { balance } = currencyBalances.reduce((previousBalance, currentBalance) => {
      const currencyRate = currencyRates.find(
        (currencyRate) => currencyRate.currency.code === currentBalance.currencyCode,
      );

      if (!currencyRate) {
        return previousBalance;
      }

      const mainCurrencyBalance = currentBalance.balance / currencyRate.rate;
      previousBalance.balance += mainCurrencyBalance;

      return previousBalance;
    });

    if (isNullOrZero(balance)) {
      showMessage({
        message: "Invalid value of balance!",
        type: "danger",
      });
      Vibration.vibrate(0.1);

      return;
    }

    const roundedBalance = Number(balance.toFixed(2));

    if (isNaN(roundedBalance)) {
      showMessage({
        message: "Invalid value of the balance!",
        type: "danger",
      });
      Vibration.vibrate(0.1);

      return;
    }

    try {
      setInitialBalanceOperation(roundedBalance);
      props.onMoveNext();
    } catch (e) {
      showMessage({
        message: (e as Error).message,
        type: "danger",
      });
      Vibration.vibrate(0.1);

      return;
    }
  };

  return (
    <ScrollView style={totalBalanceStepStyles.mainWrapper}>
      {currencyBalances.map((currencyBalance, index) => (
        <Layout key={index} style={totalBalanceStepStyles.balanceInputWrapper}>
          <Input
            style={totalBalanceStepStyles.balanceInput}
            placeholder="Enter your initial balance..."
            keyboardType="numeric"
            value={currencyBalance.balance.toString()}
            onChangeText={(value) => changeBalance(value, index)}
          />
          <Select value={currencyBalance.currencySymbol} style={totalBalanceStepStyles.selectCurrency}>
            {currencyRates.map((currencyRate) => (
              <SelectItem
                key={currencyRate.currency.code}
                title={currencyRate.currency.symbol}
                onPress={() => changeCurrency(currencyRate, index)}
              />
            ))}
          </Select>
        </Layout>
      ))}
      <Layout style={totalBalanceStepStyles.addNewBalanceButtonWrapper}>
        <Button onPress={onAddNewBalance} status="info" style={totalBalanceStepStyles.addNewBalanceButton}>
          Add new balance
        </Button>
      </Layout>
      <Layout style={totalBalanceStepStyles.moveButtonsContainer}>
        <Button style={totalBalanceStepStyles.moveButton} onPress={props.onMoveBack}>
          Back
        </Button>
        <Button style={totalBalanceStepStyles.moveButton} onPress={onMoveNextClick}>
          Next
        </Button>
      </Layout>
    </ScrollView>
  );
}
