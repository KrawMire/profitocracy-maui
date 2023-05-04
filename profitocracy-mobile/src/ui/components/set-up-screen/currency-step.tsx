import { Button, IndexPath, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { currencyStepStyle } from "styles/components/set-up-screen/currency-step.style";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyRate } from "domain/currency-rate";
import { availableCurrencies } from "utils/currency/available-currencies";
import Loading from "components/shared/loading";
import { setCurrencyRates } from "state/currency-rates/actions";
import { setMainCurrency } from "state/settings/actions";
import { showWarning } from "utils/toast/show-warning";
import { AppState } from "state/app-state";
import { roundNumber } from "utils/numbers/convert-number";

export interface CurrencyStepProps {
  onMoveNext: () => void;
  onMoveBack: () => void;
}

export function CurrencyStep(props: CurrencyStepProps) {
  const dispatch = useDispatch();

  const currencyRates = useSelector((state: AppState) => state.currencyRates);

  const [baseCurrencyIndex, setBaseCurrencyIndex] = useState<IndexPath>(new IndexPath(0));
  const [currenciesLoaded, setCurrencyLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const baseCurrency = availableCurrencies[baseCurrencyIndex.row];

  useEffect(() => loadCurrencies(), [baseCurrencyIndex]);

  const loadCurrencies = () => {
    setCurrencyLoaded(false);

    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency.code}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response: any) => {
        if (!response.success) {
          showWarning("Cannot load currencies data. Try again later.");
          return;
        }

        const rates = response.rates;
        const updatedAvailableCurrencies: CurrencyRate[] = availableCurrencies.map((currency) => ({
          currency: {
            name: currency.name,
            code: currency.code,
            symbol: currency.symbol,
          },
          rate: roundNumber(rates[currency.code]),
        }));

        dispatch(setCurrencyRates(updatedAvailableCurrencies));
        setCurrencyLoaded(true);
        setLoadingError(false);
      })
      .catch(() => {
        setLoadingError(true);
        showMessage({
          message: "Cannot load currencies data. Try again later.",
          type: "warning",
        });
      });
  };

  const onLoadCurrenciesClick = () => {
    setCurrencyLoaded(false);
    setLoadingError(false);
    loadCurrencies();
  };

  const onMoveBackClick = () => {
    props.onMoveBack();
  };

  const onMoveNextClick = () => {
    dispatch(setMainCurrency(baseCurrency));
    props.onMoveNext();
  };

  return (
    <Layout>
      {currenciesLoaded ? (
        <Select
          label="Main currency"
          value={baseCurrency.name}
          onSelect={(index) => setBaseCurrencyIndex(index as IndexPath)}
          style={currencyStepStyle.selectCurrency}
        >
          {currenciesLoaded ? (
            availableCurrencies.map((currency) => <SelectItem key={currency.code} title={currency.name} />)
          ) : (
            <SelectItem title={baseCurrency.name} />
          )}
        </Select>
      ) : (
        <Loading />
      )}
      {loadingError && (
        <Layout>
          <Text>There was an error while trying to get currency rates. Try again</Text>
          <Button onPress={onLoadCurrenciesClick}>Load currencies rates</Button>
        </Layout>
      )}
      {currencyRates.map((rate) => (
        <Text key={rate.currency.code}>
          {rate.currency.code}: {rate.rate}
        </Text>
      ))}
      <Layout style={currencyStepStyle.moveButtonsContainer}>
        <Button style={currencyStepStyle.moveButton} onPress={onMoveBackClick}>
          Back
        </Button>
        <Button style={currencyStepStyle.moveButton} onPress={onMoveNextClick}>
          Next
        </Button>
      </Layout>
    </Layout>
  );
}
