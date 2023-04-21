import { Button, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AppState from "src/domain/app-state/app-state";
import { showMessage } from "react-native-flash-message";
import { setAvailableCurrencies, setMainCurrency } from "state/currency/actions";
import { CurrencyRate } from "domain/app-state/components/currency-state";
import { currencyStepStyles } from "styles/components/set-up-screen/currency.style";

export interface CurrencyStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function CurrencyStep(props: CurrencyStepProps) {
  const dispatch = useDispatch();

  const availableCurrencies = useSelector((state: AppState) => state.currencies.availableCurrencies);
  const baseCurrencyInitial = useSelector((state: AppState) => state.currencies.baseCurrency);

  const [baseCurrency, setBaseCurrency] = useState(baseCurrencyInitial);
  const [currenciesLoaded, setCurrencyLoaded] = useState(false);

  useEffect(() => loadCurrencies, [baseCurrency]);

  const loadCurrencies = () => {
    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency.code}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response: any) => {
        if (!response.success) {
          showMessage({
            message: "Cannot load currencies data. Try again later.",
            type: "warning",
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
          rate: rates[currency.currency.code],
        }));

        dispatch(setAvailableCurrencies(updatedAvailableCurrencies));
        setCurrencyLoaded(true);
      })
      .catch(() => {
        showMessage({
          message: "Cannot load currencies data. Try again later.",
          type: "warning",
        });
      });
  };

  const onMoveNextClick = () => {
    dispatch(setMainCurrency(baseCurrency));
    props.onMoveNext();
  };

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
        style={currencyStepStyles.selectCurrency}
      >
        {currenciesLoaded ? (
          availableCurrencies.map((currency) => {
            return (
              <SelectItem
                key={currency.currency.code}
                title={currency.currency.name}
                onPress={() => setBaseCurrency(currency.currency)}
              />
            );
          })
        ) : (
          <SelectItem title={baseCurrency.name} />
        )}
      </Select>
      <Layout style={currencyStepStyles.moveButtonsContainer}>
        <Button style={currencyStepStyles.moveButton} onPress={props.onMoveBack}>
          Back
        </Button>
        <Button style={currencyStepStyles.moveButton} onPress={onMoveNextClick}>
          Next
        </Button>
      </Layout>
    </Layout>
  );
}
