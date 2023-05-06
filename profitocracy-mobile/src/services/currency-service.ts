import { showWarning } from "utils/toast/show-warning";
import { CurrencyRate } from "domain/currency-rate";
import { availableCurrencies } from "utils/currency/available-currencies";
import { showMessage } from "react-native-flash-message";

export class CurrencyService {
  static getCurrencyRates(baseCurrencyCode: string): Promise<any> {
    return fetch(`https://api.exchangerate.host/latest?base=${baseCurrencyCode}`, {
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
          rate: rates[currency.code],
        }));

        return updatedAvailableCurrencies;
      })
      .catch(() => {
        showMessage({
          message: "Cannot load currencies data. Try again later.",
          type: "warning",
        });
      });
  }
}
