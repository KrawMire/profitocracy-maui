import {CurrencyRate} from "../../../../domain/app-state/components/currency-state";
import {showMessage} from "react-native-flash-message";
import Transaction from "../../../../domain/transaction/transaction";

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

export function convertToBaseCurrency(transaction: Transaction, currencies: CurrencyRate[]): string {
  const transactionCurrency = currencies.find((currency) => currency.currency.code === transaction.currencyCode);

  if (!transactionCurrency) {
    showMessage({
      message: "Invalid currency code was given!",
      type: "danger"
    });

    return "";
  }

  const convertedAmount = transaction.amount / transactionCurrency.rate;

  return convertedAmount.toFixed(2);
}