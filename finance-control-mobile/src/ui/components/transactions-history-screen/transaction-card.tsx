import {Card, Text} from "@ui-kitten/components";
import {
  getCurrencySymbolByCode
} from "./actions/currency-operations";
import { getCategoryName } from "./actions/expense-category";
import Transaction from "domain/transaction/transaction";
import { CurrencyRate } from "domain/app-state/components/currency-state";
import Currency from "domain/currency/currency";
import ExpenseCategory from "domain/expense-category/expense-category";
import {getExpenseTypeName} from "components/transactions-history-screen/actions/expense-type";
import {View} from "react-native";
import {transactionCardStyle} from "styles/components/transactions-history-screen/transaction-card.style";

export interface TransactionCardProps {
  transaction: Transaction;
  currencyRates: CurrencyRate[];
  mainCurrency: Currency;
  categories: ExpenseCategory[];
}

export function TransactionCard(props: TransactionCardProps) {
  const amount = props.transaction.amount;
  const amountCurrencySymbol = getCurrencySymbolByCode(props.transaction.currencyCode, props.currencyRates);

  const amountInBaseCurrency = props.transaction.baseCurrencyAmount;
  const baseCurrencySymbol = props.mainCurrency.symbol;

  const expenseTypeName = getExpenseTypeName(props.transaction.type);
  const categoryName = getCategoryName(props.transaction.category, props.categories);
  const transactionDescription = props.transaction.description;


  const renderHeader = () => (
    <View>
      <Text
        category="h5"
      >
        {amount}{amountCurrencySymbol}
      </Text>
      <Text
        category="h6"
        appearance="hint"
      >
        {expenseTypeName}
      </Text>
      {amountCurrencySymbol !== baseCurrencySymbol && (
        <Text
          category="h6"
          appearance="hint"
        >
          {amountInBaseCurrency}{baseCurrencySymbol}
        </Text>
      )}
    </View>
  );

  return (
    <Card
      header={renderHeader()}
      style={transactionCardStyle.transactionCard}
    >
      {categoryName && (
        <Text>
          Category: {categoryName}
        </Text>
      )}
      {transactionDescription && transactionDescription.length > 0 && (
        <Text>
          {transactionDescription}
        </Text>
      )}
    </Card>
  )
}