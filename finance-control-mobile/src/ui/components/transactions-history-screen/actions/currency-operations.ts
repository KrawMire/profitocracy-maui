import {CurrencyRate} from "domain/app-state/components/currency-state";
import {showMessage} from "react-native-flash-message";

export function getCurrencySymbolByCode(code: string, currencies: CurrencyRate[]): string {
  const searchCurrency = currencies.find((currency) => currency.currency.code === code);

  if (!searchCurrency) {
    showMessage({
      message: "Invalid currency code was given!",
      type: "danger"
    });

    return "";
  }

  return searchCurrency.currency.symbol;
}
