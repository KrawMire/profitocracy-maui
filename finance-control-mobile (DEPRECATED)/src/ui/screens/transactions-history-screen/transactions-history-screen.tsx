import { useDispatch, useSelector } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { removeTransaction } from "state/transactions/actions";

import { transactionsHistoryScreenStyles } from "styles/screens/transactions-history.style";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { TransactionCard } from "components/transactions-history-screen/transaction-card";
import { useState } from "react";

export function TransactionsHistoryScreen() {
  const dispatch = useDispatch();

  const currencyRates = useSelector((state: AppState) => state.currencies.availableCurrencies);
  const mainCurrency = useSelector((state: AppState) => state.currencies.baseCurrency);
  const transactions = useSelector((state: AppState) => state.transactions.transactions);
  const categories = useSelector((state: AppState) => state.settings.settings.expenseCategoriesSettings.categories);

  const [showClearModal, setShowClearModal] = useState(false);

  const onShowModal = () => {
    setShowClearModal(true);
  };

  const onHideModal = () => {
    setShowClearModal(false);
  };

  const clearTransactions = () => {
    transactions.forEach((transaction) => {
      dispatch(removeTransaction(transaction.id));
    });
  };

  return (
    <Layout style={transactionsHistoryScreenStyles.wrapper} level="4">
      <Text category="h1">Transactions history</Text>
      <Button onPress={onShowModal} style={transactionsHistoryScreenStyles.clearButton}>
        Clear all transactions
      </Button>
      <ScrollView style={transactionsHistoryScreenStyles.transactionsListWrapper}>
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            mainCurrency={mainCurrency}
            currencyRates={currencyRates}
            categories={categories}
          />
        ))}
      </ScrollView>

      <Modal
        visible={showClearModal}
        onBackdropPress={onHideModal}
        backdropStyle={transactionsHistoryScreenStyles.clearModalBackdrop}
      >
        <Card header={<Text category="h4">Are you sure?</Text>}>
          <Button status="danger" onPress={clearTransactions}>
            Clear
          </Button>
          <Button status="primary" style={transactionsHistoryScreenStyles.clearButton} onPress={onHideModal}>
            Cancel
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}
