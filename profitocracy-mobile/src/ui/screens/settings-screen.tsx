import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { Keyboard, ScrollView } from "react-native";
import { settingsScreenStyles } from "styles/screens/settings-screen.style";
import { resetStore } from "state/global/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppThemeSettings } from "components/settings-screen/app-theme-settings";
import { ExpensesCategoriesSettings } from "components/settings-screen/expense-categories-settings";

export function SettingsScreen() {
  const dispatch = useDispatch();
  const [showResetModal, setShowResetModal] = useState(false);

  const onResetApp = () => {
    dispatch(resetStore());
  };

  const onShowModal = () => {
    setShowResetModal(true);
  };

  const onHideModal = () => {
    setShowResetModal(false);
  };

  const renderHeader = (header: string) => <Text category="h5">{header}</Text>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={settingsScreenStyles.wrapper} level="4">
        <ScrollView>
          <Text category="h1">Settings</Text>
          <Card header={renderHeader("App theme")} style={settingsScreenStyles.settingsCard}>
            <AppThemeSettings />
          </Card>
          <Card header={renderHeader("Expense categories")} style={settingsScreenStyles.settingsCard}>
            <ExpensesCategoriesSettings />
          </Card>
          <Button onPress={onShowModal} status="danger" style={settingsScreenStyles.resetAppButton}>
            Reset app
          </Button>
        </ScrollView>

        <Modal
          visible={showResetModal}
          onBackdropPress={onHideModal}
          backdropStyle={settingsScreenStyles.resetModalBackdrop}
        >
          <Card header={<Text category="h4">Are you sure?</Text>}>
            <Button status="danger" onPress={onResetApp}>
              Reset
            </Button>
            <Button status="primary" style={settingsScreenStyles.resetAppButton} onPress={onHideModal}>
              Cancel
            </Button>
          </Card>
        </Modal>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
