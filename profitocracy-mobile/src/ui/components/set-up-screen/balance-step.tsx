import { Button, IndexPath, Input, Layout, Select, SelectItem } from "@ui-kitten/components";
import { ScrollView } from "react-native";

import { balanceStepStyle } from "styles/components/set-up-screen/balance-step.style";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { availableCurrencies } from "utils/currency/available-currencies";
import { showError } from "utils/toast/show-error";
import { AppState } from "state/app-state";
import { setMainBalance } from "state/main-balance/actions";
import { Balance } from "domain/balance";
import { roundNumber } from "utils/numbers/convert-number";

interface BalanceWithCurrency {
  currencyIndex: IndexPath;
  amount: number;
}

const baseBalanceWithCurrency: BalanceWithCurrency = {
  amount: 0,
  currencyIndex: new IndexPath(0),
};

export interface BalanceStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function BalanceStep(props: BalanceStepProps) {
  const dispatch = useDispatch();

  const mainCurrency = useSelector((state: AppState) => state.settings.mainCurrency);
  const currencyRates = useSelector((state: AppState) => state.currencyRates);
  const [balances, setBalances] = useState<BalanceWithCurrency[]>([{ ...baseBalanceWithCurrency }]);

  const onChangeBalance = (value: string, balanceIndex: number) => {
    const balanceValue = Number(value);

    if (isNaN(balanceValue)) {
      showError("Invalid value of saved-balance!");
      return;
    }

    const newBalances = [...balances];
    newBalances[balanceIndex].amount = balanceValue;

    setBalances(newBalances);
  };

  const onChangeCurrency = (currencyIndex: IndexPath, balanceIndex: number) => {
    const newBalances = [...balances];
    newBalances[balanceIndex].currencyIndex = currencyIndex;

    setBalances(newBalances);
  };

  const onAddNewBalanceClick = () => {
    const newBalances = [...balances];
    newBalances.push({ ...baseBalanceWithCurrency });

    setBalances(newBalances);
  };

  const onBackClick = () => {
    props.onMoveBack();
  };

  const onNextClick = () => {
    let convertedBalance: number;

    if (balances.length === 1) {
      const balanceCurrency = availableCurrencies[balances[0].currencyIndex.row];
      const currencyRate = currencyRates.find((rate) => rate.currency.code === balanceCurrency.code);

      if (!currencyRate) {
        showError("Cannot get currency!");
        return;
      }

      convertedBalance = balances[0].amount / currencyRate.rate;
    } else {
      const reducedBalance = balances.reduce((prevBalance, currBalance, currentIndex) => {
        const balanceCurrency = availableCurrencies[currBalance.currencyIndex.row];
        const currencyRate = currencyRates.find((rate) => rate.currency.code === balanceCurrency.code);

        if (!currencyRate) {
          return prevBalance;
        }

        const convertedAmount = currBalance.amount / currencyRate.rate;

        if (currentIndex === 1) {
          const prevBalanceCurrency = availableCurrencies[prevBalance.currencyIndex.row];
          const prevCurrencyRate = currencyRates.find((rate) => rate.currency.code === prevBalanceCurrency.code);

          if (!prevCurrencyRate) {
            return prevBalance;
          }

          const prevConvertedAmount = prevBalance.amount / prevCurrencyRate.rate;
          currBalance.amount = prevConvertedAmount + convertedAmount;
        } else {
          currBalance.amount = prevBalance.amount + convertedAmount;
        }

        return currBalance;
      });

      convertedBalance = reducedBalance.amount;
    }

    const roundedBalance = roundNumber(convertedBalance);

    const mainBalance: Balance = {
      currency: mainCurrency,
      amount: roundedBalance,
    };
    dispatch(setMainBalance(mainBalance));

    props.onMoveNext();
  };

  return (
    <ScrollView style={balanceStepStyle.mainWrapper}>
      {balances.map((balance, index) => (
        <Layout key={index} style={balanceStepStyle.balanceInputWrapper}>
          <Input
            style={balanceStepStyle.balanceInput}
            placeholder="Enter your initial balance..."
            keyboardType="numeric"
            onChangeText={(value) => onChangeBalance(value, index)}
            value={balance.amount.toString()}
          />
          <Select
            style={balanceStepStyle.selectCurrency}
            value={availableCurrencies[balance.currencyIndex.row].symbol}
            onSelect={(currencyIndex) => onChangeCurrency(currencyIndex as IndexPath, index)}
          >
            {availableCurrencies.map((availableCurrency) => (
              <SelectItem key={availableCurrency.symbol} title={availableCurrency.code} />
            ))}
          </Select>
        </Layout>
      ))}
      <Layout style={balanceStepStyle.addNewBalanceButtonWrapper}>
        <Button status="info" style={balanceStepStyle.addNewBalanceButton} onPress={onAddNewBalanceClick}>
          Add new balance
        </Button>
      </Layout>
      <Layout style={balanceStepStyle.moveButtonsContainer}>
        <Button style={balanceStepStyle.moveButton} onPress={onBackClick}>
          Back
        </Button>
        <Button style={balanceStepStyle.moveButton} onPress={onNextClick}>
          Next
        </Button>
      </Layout>
    </ScrollView>
  );
}
