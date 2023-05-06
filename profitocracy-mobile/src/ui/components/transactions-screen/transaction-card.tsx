import { Card, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { transactionCardStyle } from "styles/components/transactions-screen/transaction-card.style";
import { Transaction } from "domain/transaction";
import { CurrencyRate } from "domain/currency-rate";
import { Currency } from "domain/currency";
import { Category } from "domain/category";
import { getSpendingTypeName } from "operations/transactions-screen/get-spending-type-name";

export interface TransactionCardProps {
  transaction: Transaction;
  currencyRates: CurrencyRate[];
  mainCurrency: Currency;
  categories: Category[];
}

export function TransactionCard(props: TransactionCardProps) {
  const isIncome = props.transaction.isIncome;
  const category = props.transaction.category;
  const date = new Date(props.transaction.date);

  const amount = props.transaction.amount;
  const amountCurrencySymbol = props.transaction.currency.symbol;
  const amountInBaseCurrency = props.transaction.mainCurrencyAmount;
  const baseCurrencySymbol = props.mainCurrency.symbol;

  const spendTypeName = getSpendingTypeName(props.transaction.spendType);
  const categoryName = category?.name;
  const transactionDescription = props.transaction.description;

  const renderHeader = () => (
    <View>
      <Text category="h5">
        {isIncome ? "+" : "-"}
        {amount}
        {amountCurrencySymbol}
      </Text>
      <Text category="h6" appearance="hint">
        {date.toDateString()}
      </Text>
      {!isIncome && (
        <Text category="h6" appearance="hint">
          {spendTypeName}
        </Text>
      )}
      {amountCurrencySymbol !== baseCurrencySymbol && (
        <Text category="h6" appearance="hint">
          {amountInBaseCurrency}
          {baseCurrencySymbol}
        </Text>
      )}
    </View>
  );

  return (
    <Card header={renderHeader()} style={transactionCardStyle.transactionCard}>
      {categoryName && <Text>Category: {categoryName}</Text>}
      {transactionDescription && transactionDescription.length > 0 && <Text>{transactionDescription}</Text>}
    </Card>
  );
}
