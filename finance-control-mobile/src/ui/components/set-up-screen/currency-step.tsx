import { Button, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { totalBalanceStepStyles } from "styles/components/set-up-screen/total-balance.style";
import {useEffect, useState} from "react";
import AppState from "../../../domain/app-state/app-state";
import { showMessage } from "react-native-flash-message";
import {setAvailableCurrencies, setMainCurrency} from "state/currency/actions";
import {CurrencyRate} from "../../../domain/app-state/components/currency-state";

export interface CurrencyStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function CurrencyStep(props: CurrencyStepProps) {
  const dispatch = useDispatch();

  const availableCurrencies = useSelector((state: AppState) => state.currencies.availableCurrencies);
  const baseCurrencyInitial = useSelector((state: AppState) => state.currencies.baseCurrency)

  const [ baseCurrency, setBaseCurrency ] = useState(baseCurrencyInitial);
  const [ currenciesLoaded, setCurrencyLoaded ] = useState(false);

  useEffect(() => loadCurrencies, [baseCurrency]);


  const loadCurrencies = () => {
    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency.code}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((response: any) => {
        if (!response.success) {
          showMessage({
            message: "Cannot load currencies data. Try again later.",
            type: "danger"
          });
          return;
        }

        const rates = response.rates;
        const updatedAvailableCurrencies: CurrencyRate[] = availableCurrencies.map((currency) => ({
          currency: {
            name: currency.currency.name,
            code: currency.currency.code,
            symbol: currency.currency.symbol,
          },
          rate: rates[currency.currency.code]
        }));
        console.log(updatedAvailableCurrencies);
        dispatch(setAvailableCurrencies(updatedAvailableCurrencies));
        setCurrencyLoaded(true);
      })
      .catch(() => {
        showMessage({
          message: "Cannot load currencies data. Try again later.",
          type: "danger"
        });
      });
  }

  const onMoveNextClick = () => {
    dispatch(setMainCurrency(baseCurrency));
    props.onMoveNext();
  }

  if (!currenciesLoaded) {
    loadCurrencies();
  }

  return (
    <Layout>
      <Select
        label="Main currency"
        placeholder="Select main currency..."
        value={baseCurrency.name}
        onLayout={loadCurrencies}
      >
        {currenciesLoaded ?
          availableCurrencies.map((currency) => {
            return (
            <SelectItem
              key={currency.currency.code}
              title={currency.currency.name}
              onPress={() => setBaseCurrency(currency.currency)}
            />
          )}) : (
            <SelectItem
              title={baseCurrency.name}
            />
          )
        }
      </Select>
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