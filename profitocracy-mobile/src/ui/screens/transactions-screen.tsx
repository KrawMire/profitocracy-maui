import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state/app-state";
import { removeTransaction } from "state/transactions/actions";

import { transactionsScreenStyle } from "styles/screens/transactions-screen.style";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { TransactionCard } from "components/transactions-screen/transaction-card";
import { useState } from "react";

export function TransactionsScreen() {
  const dispatch = useDispatch();

  const currencyRates = useSelector((state: AppState) => state.currencyRates);
  const mainCurrency = useSelector((state: AppState) => state.settings.mainCurrency);
  const transactions = useSelector((state: AppState) => state.transactions);
  const categories = useSelector((state: AppState) => state.categories);

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
    setShowClearModal(false);
  };

  return (
    <Layout style={transactionsScreenStyle.wrapper} level="4">
      <Text category="h1">Transactions history</Text>
      <Button onPress={onShowModal} style={transactionsScreenStyle.clearButton}>
        Clear all transactions
      </Button>
      <ScrollView style={transactionsScreenStyle.transactionsListWrapper}>
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
        backdropStyle={transactionsScreenStyle.clearModalBackdrop}
      >
        <Card header={<Text category="h4">Are you sure?</Text>}>
          <Button status="danger" onPress={clearTransactions}>
            Clear
          </Button>
          <Button status="primary" style={transactionsScreenStyle.clearButton} onPress={onHideModal}>
            Cancel
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
}
